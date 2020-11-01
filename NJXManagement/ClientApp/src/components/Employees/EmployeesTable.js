import React, { useEffect,useState } from 'react';
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
  { field: 'fname', headerName: 'First name', width: 130 },
  { field: 'lname', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone Number', width: 160 },
];

function makeEmployeeData(employee) {
  let employeeID = employee.employeeID;
  let firstName = employee.firstName;
  let lastName = employee.lastName;
  let phoneNumber = employee.phoneNumber;
  let email = employee.email;

  let employeeObj = {id: employeeID, lname: lastName, fname: firstName, email: email, phone: phoneNumber}
  return employeeObj
}

export default function EmployeesTable() {
    const classes = useStyles();

    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
      getEmployeeData();
    }, []);
  
    // get employee data from api
    const getEmployeeData = async () => {
      console.log("START API REQUEST")
      const response = await fetch("Payroll/employees ");
      const jsonData = await response.json();
      let employees = jsonData["employees"];

      console.log(employees);

      let employeeRows = []
      for (const employee in employees) {
        employeeRows.push(makeEmployeeData(employees[employee]))
      }
      // sort by last name
      employeeRows.sort((a, b) => a.lname.localeCompare(b.lname));

      console.log(employeeRows);

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