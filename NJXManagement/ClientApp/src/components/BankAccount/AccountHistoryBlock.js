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

export default function Example() {
  return (
    <Paper variant="outlined" className="card-paper">
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#89D0F5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
