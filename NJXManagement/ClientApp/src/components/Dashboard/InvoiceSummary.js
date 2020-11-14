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
import Moment from 'moment';

export default function BusinessSavingsAccount() {

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

    // change date format
    for (let month in totals) {
      let dateParts = totals[month].date.split("-")
      totals[month].date = Moment(dateParts[1]).format("MMM") + " " + dateParts[0]
    }

    totals = totals.slice(0, 8);

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
      <h5>Invoice Summary</h5>
      
      <hr></hr>
      <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
          <BarChart
            data={invoicesData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amountPaid" stackId="a" fill="#68A3DE" name="Paid"/>
            <Bar dataKey="amountDue" stackId="a" fill="#bfbfbf" name="Due"/>
          </BarChart>
        </ResponsiveContainer>
        </div>
    </Paper>
    
  );
}
