import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'calendar', headerName: 'Calendar', width: 130 },
  { field: 'nextPaymentDate', headerName: 'Next Payment Date', width: 160 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 6, lastName: 'Melisandre', firstName: 'Jamie', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 11, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 12, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 13, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 14, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
  { id: 17, lastName: 'Roxie', firstName: 'Harvey', calendar: 'Weekly', nextPaymentDate: '16 Jul 2019' },
];

export default function EmployeesTable() {
    const classes = useStyles();
  return (
    <Paper variant="outlined" className="card-paper">
    <h5>Employees</h5>
    <hr></hr>
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
    </div>
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add Employee
      </Button>
    </Paper>
  );
}