import React, { useEffect,useState } from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from  'moment';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    formGroupTitle: {
      marginTop: theme.spacing(4),
      paddingBottom: 0,
      marginBottom: 0,
    },
    openState: {
      backgroundColor: "#68A3DE",
      color: "white",
      padding: "7px",
      textAlign: "center",
      borderRadius: "1px"
    },
    paidState: {
      backgroundColor: "lightGrey",
      color: "white",
      padding: "7px",
      textAlign: "center",
      borderRadius: "1px"
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

      // sort invoices on due date
      jsonData.Invoices.sort((a, b) => b.DueDateString.localeCompare(a.DueDateString));

      // save into state
      setInvoicesData(jsonData.Invoices)
    };

    const OpenState = () => {
      return <div className={classes.openState}>Open</div>
    }

    const PaidState = () => {
      return <div className={classes.paidState}>Paid</div>
    }

  return (
    <Paper variant="outlined" className="card-paper">
    <h5>All Invoices</h5>
    <hr></hr>
    <Table className={classes.table}  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Amount Due</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoicesData.map((invoice) => (
            <TableRow key={invoice.InvoiceID}>
                <TableCell>{(invoice["Total"] - invoice["AmountPaid"]) > 0 ? OpenState() : PaidState()}</TableCell>
                <TableCell>{Moment(invoice["DateString"].split('T')[0]).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{Moment(invoice["DueDateString"].split('T')[0]).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{invoice.Contact["Name"]}</TableCell>
                <TableCell>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(invoice["AmountDue"])}</TableCell>
                <TableCell>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(invoice["AmountPaid"])}</TableCell>
                <TableCell>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(invoice["Total"])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </Paper>
  );
}