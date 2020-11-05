import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Paper from "@material-ui/core/Paper";

const data = [
  {
    name: "May",
    overdue: 4000,
  },
  {
    name: "June",
    overdue: 3000,
  },
  {
    name: "July",
    overdue: 2000,
  },
  {
    name: "August",
    overdue: 1890,
  },
  {
    name: "September",
    overdue: 2390,
  },
  {
    name: "October",
    overdue: 3490,
  },
];

export default function Bills() {
  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Bills you need to pay</h5>
      <hr></hr>
      <p>Draft bills: 0.00</p>
      <p>12 Awaiting payment: 7429.21</p>
      <p>12 Overdue: 7429.21</p>
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="overdue" fill="#68A3DE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
