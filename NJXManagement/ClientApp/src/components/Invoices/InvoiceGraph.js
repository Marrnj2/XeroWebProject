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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page H",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page I",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page J",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page K",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page L",
    uv: 2780,
    pv: 3908,
    amt: 2000
  }
];

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

    // save into state
    setInvoicesData(jsonData.Invoices);
  };

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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="AmountPaid" stackId="a" fill="#68A3DE" />
            <Bar dataKey="AmountDue" stackId="a" fill="lightGrey" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
