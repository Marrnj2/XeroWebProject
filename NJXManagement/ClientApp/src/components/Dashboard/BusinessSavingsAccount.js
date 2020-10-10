import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const data = [
  {
    name: "Sep 29",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sep 30",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Oct 1",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Oct 2",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Oct 3",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Oct 4",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Oct 5",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BusinessSavingsAccount() {
  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Business Savings Account</h5>
      
      <p>02-0908-7654321-050</p>
      <hr></hr>
      <h5>No transactions imported</h5>
    </Paper>
  );
}
