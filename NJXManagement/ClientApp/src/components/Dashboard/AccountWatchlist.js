import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {},
});

function createData(account, thisMonth, ytd) {
  return { account, thisMonth, ytd };
}

const rows = [
  createData("Advertising", 0.00, 9090.21),
  createData("Entertainment", 0.00, 46.61),
  createData("Inventory", 0.00, 0.00),
  createData("Sales", 0.00, 25249.13),
];

export default function AccountWatchlist() {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className="card-paper">
      <h5>Account Watchlist</h5>
      <hr></hr>
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">This Month</TableCell>
              <TableCell align="right">YTD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.account}
                </TableCell>
                <TableCell align="right">{row.thisMonth}</TableCell>
                <TableCell align="right">{row.ytd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
