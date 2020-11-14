import React, { useEffect,useState } from 'react';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import AddEmployeeDialog from './AddEmployeeDialog'
import UpdateEmployeeDialog from './UpdateEmployeeDialog'
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

// getting the relavent fields for each employee
function makeEmployeeData(employee) {
  console.log(employee)
  let employeeID = employee.employeeID;
  let firstName = employee.firstName;
  let lastName = employee.lastName;
  let phoneNumber = employee.phoneNumber;
  let email = employee.email;
  let dob = (employee.dateOfBirth) ? (employee.dateOfBirth.split('T')[0]) : ("-");
  // get only dates if they exist, else return '-'
  let startDate = (employee.startDate) ? (employee.startDate.split('T')[0]) : ("-");
  let endDate = (employee.endDate) ? (employee.endDate.split('T')[0]) : ("-");

  let address1 = employee.address.addressLine1;
  let address2 = employee.address.addressLine2;
  let city = employee.address.city;
  let postcode = employee.address.postCode;

  //save employee data into new object and return it
  let employeeObj = {id: employeeID, lname: lastName, fname: firstName, dob: dob, email: email, phone: phoneNumber, startDate: startDate, endDate: endDate, address1: address1, address2: address2, city: city, postcode: postcode}
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
      const response = await fetch("Payroll/employees");
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
    <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell component="th" scope="row" padding="none">
                <UpdateEmployeeDialog employee={employee}/>
              </TableCell>
              <TableCell>{employee.fname}</TableCell>
              <TableCell>{employee.lname}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.startDate}</TableCell>
              <TableCell>{employee.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddEmployeeDialog/>

    </Paper>
  );
}