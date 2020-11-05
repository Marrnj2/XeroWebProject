import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Paper from "@material-ui/core/Paper";

const data = [
  {
    name: "Sep 29",
    Balance: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sep 30",
    Balance: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Oct 1",
    Balance: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Oct 2",
    Balance: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Oct 3",
    Balance: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Oct 4",
    Balance: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Oct 5",
    Balance: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BusinessBankAccount() {
  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Business Bank Account</h5>
      
      <p>12-0102-0345678-000</p>
      <hr></hr>
      <p>Balance in Xero: 11,248.22</p>
      <p>Statement balance (Sep 12): 18,241.67</p>
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />

            <Tooltip />
            <Area
              type="monotone"
              dataKey="Balance"
              fill="#0466c8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
