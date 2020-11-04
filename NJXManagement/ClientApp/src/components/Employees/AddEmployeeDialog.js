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
    }
    console.log(employee)

    // send to back end
    fetch('Employee/Add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

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