import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Paper from "@material-ui/core/Paper";

const data = [
  {
    name: "May",
    in: 4000,
    out: 2400,
  },
  {
    name: "June",
    in: 3000,
    out: 1398,
  },
  {
    name: "July",
    in: 2000,
    out: 9800,
  },
  {
    name: "August",
    in: 1890,
    out: 4800,
  },
  {
    name: "September",
    in: 2390,
    out: 3800,
  },
  {
    name: "October",
    in: 3490,
    out: 4300,
  },
];

export default function TotalCashInAndOut() {
  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Total cash in and out</h5>
      <hr></hr>
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="in" fill="#68A3DE" />
        <Bar dataKey="out" fill="LightGray" />
      </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
