import React, { useEffect,useState } from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    formGroupTitle: {
      marginTop: theme.spacing(4),
      paddingBottom: 0,
      marginBottom: 0,
    },
  }));

export default function InvoiceTable() {
    const classes = useStyles();

    const [invoicesData, setInvoicesData] = useState([]);

    // on component load get api data
    useEffect(() => {
      getInvoicesData();
    }, []);
  
    // get employee data from api
    const getInvoicesData = async () => {
      console.log("START API REQUEST")
      const response = await fetch("Xero/Invoices");
      const jsonData = await response.json();
      console.log(jsonData.Invoices);

      // save into state
      setInvoicesData(jsonData.Invoices)
    };

  return (
    <Paper variant="outlined" className="card-paper">
    <h5>Invoices</h5>
    <hr></hr>
    <Table className={classes.table}  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Amount Due</TableCell>
            <TableCell>Amount Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoicesData.map((invoice) => (
            <TableRow key={invoice.InvoiceID}>
                <TableCell>Status</TableCell>
                <TableCell>{invoice["DateString"]}</TableCell>
                <TableCell>{invoice["DueDateString"]}</TableCell>
                <TableCell>{invoice["ContactID"]}</TableCell>
                <TableCell>{invoice["Total"]}</TableCell>
                <TableCell>{invoice["AmountDue"]}</TableCell>
                <TableCell>{invoice["AmountPaid"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
  );
}