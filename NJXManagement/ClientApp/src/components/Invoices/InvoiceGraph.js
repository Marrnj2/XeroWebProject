import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function InvoiceTable() {
  const [invoicesData, setInvoicesData] = useState([]);

  // on component load get api data
  useEffect(() => {
    getInvoicesData();
  }, []);

  // get employee data from api
  const getInvoicesData = async () => {
    const response = await fetch("Xero/Invoices");
    const jsonData = await response.json();
    console.log(jsonData.Invoices);

    // sort invoices on due date
    jsonData.Invoices.sort((a, b) =>
      b.DueDateString.localeCompare(a.DueDateString)
    );

    let totals = getInvoiceTotals(jsonData.Invoices);

    // save into state
    setInvoicesData(totals);
  };

  function getInvoiceTotals(invoices) {

    let newArray = []

    for (const i in invoices) {
      newArray.push({date: invoices[i]["DueDateString"].split('T')[0].slice(0, -3), amountPaid: invoices[i].AmountPaid, amountDue: invoices[i].AmountDue})
    }

    const result = [...newArray.reduce((r, o) => {
      const key = o["date"];

      const item = r.get(key) || Object.assign({}, o, {
        amountDue: 0,
        amountPaid: 0
      });

      item.amountDue += o["amountDue"];
      item.amountPaid += o["amountPaid"];

      return r.set(key, item);
    }, new Map).values()];

    console.log(result);

    return result;
  }

  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Invoices</h5>
      <hr></hr>
      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart
            data={invoicesData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amountPaid" stackId="a" fill="#68A3DE" />
            <Bar dataKey="amountDue" stackId="a" fill="lightGrey" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
