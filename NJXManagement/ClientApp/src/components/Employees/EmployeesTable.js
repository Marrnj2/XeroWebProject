import React, { useEffect,useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddEmployeeDialog from './AddEmployeeDialog'

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

// column names for the data grid
const columns = [
  { field: 'fname', headerName: 'First name', width: 130 },
  { field: 'lname', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'phone', headerName: 'Phone Number', width: 160 },
  { field: 'startDate', headerName: 'Start Date', width: 130 },
  { field: 'endDate', headerName: 'End Date', width: 130 },
];

// getting the relavent fields for each employee
function makeEmployeeData(employee) {
  let employeeID = employee.employeeID;
  let firstName = employee.firstName;
  let lastName = employee.lastName;
  let phoneNumber = employee.phoneNumber;
  let email = employee.email;
  // get only dates if they exist, else return '-'
  let startDate = (employee.startDate) ? (employee.startDate.split('T')[0]) : ("-");
  let endDate = (employee.endDate) ? (employee.endDate.split('T')[0]) : ("-");

  //save employee data into new object and return it
  let employeeObj = {id: employeeID, lname: lastName, fname: firstName, email: email, phone: phoneNumber, startDate: startDate, endDate: endDate}
  return employeeObj
}

export default function EmployeesTable() {
    const classes = useStyles();

    const [employeeData, setEmployeeData] = useState([]);

    // on component load get api data
    useEffect(() => {
      getEmployeeData();
    }, []);
  
    // get employee data from api
    const getEmployeeData = async () => {
      console.log("START API REQUEST")
      const response = await fetch("Payroll/employees ");
      const jsonData = await response.json();
      let employees = jsonData["employees"];

      // get necessary employee fields and save the new employee objects into an array
      let employeeRows = []
      for (const employee in employees) {
        employeeRows.push(makeEmployeeData(employees[employee]))
      }

      // sort by last name
      employeeRows.sort((a, b) => a.lname.localeCompare(b.lname));

      // save into state
      setEmployeeData(employeeRows)
    };

  return (
    <Paper variant="outlined" className="card-paper">
    <h5>Employees</h5>
    <hr></hr>
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={employeeData} columns={columns} pageSize={15} checkboxSelection />
    </div>
    <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <AddEmployeeDialog/>

    </Paper>
  );
}