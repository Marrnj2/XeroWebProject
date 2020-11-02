import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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

 
  
export default function AddEmployeeDialog() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [endDate, setStartDate] = useState("");
  const [startDate, setEndDate] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var employee = {
        firstName: fname,
        lastName: lname,
        dateOfBirth: dob,
        email: email,
        phoneNumber: phone,
        address: {
            addressLine1: address1,
            addressLine2: address2,
            city: city,
            postCode: postcode
        }
    }
    console.log(employee)
    handleClose()
}

  return (
      <>
    <Button
    variant="contained"
    color="primary"
    className={classes.button}
    startIcon={<AddIcon />}
    onClick={handleClickOpen}
  >
    Add Employee
  </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter in the new employees detials.
          </DialogContentText>
          
            <h5 className={classes.formGroupTitle}>General Information</h5>
            <hr></hr>
            <TextField
              autoFocus
              required
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={fname}
              onChange={e => setFName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={lname}
              onChange={e => setLName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="dob"
              label="Date of Birth"
              type="date"
              fullWidth
              variant="outlined"
              value={dob}
              onChange={e => setDOB(e.target.value)}
            />
            <TextField
              margin="dense"
              id="fname"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="text"
              fullWidth
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              margin="dense"
              id="startDate"
              label="Start Date"
              type="date"
              fullWidth
              variant="outlined"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <TextField
              margin="dense"
              id="endDate"
              label="End Date"
              type="date"
              fullWidth
              variant="outlined"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />

            <h5 className={classes.formGroupTitle}>Address</h5>
            <hr></hr>
            <TextField
              required
              margin="dense"
              id="addressLine1"
              label="Address Line 1"
              type="text"
              fullWidth
              variant="outlined"
              value={address1}
              onChange={e => setAddress1(e.target.value)}
            />

            <TextField
              margin="dense"
              id="addressLine2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="outlined"
              value={address2}
              onChange={e => setAddress2(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="city"
              label="City"
              type="text"
              variant="outlined"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="postCode"
              label="PostCode"
              type="text"
              variant="outlined"
              value={postcode}
              onChange={e => setPostCode(e.target.value)}
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="sumbit" color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}