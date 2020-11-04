import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    edtIcon: {
        color: "silver",
    }
}));

export default function UpdateEmployeeDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  console.log(props.employee)
  const [fname, setFName] = useState(props.employee.fname);
  const [lname, setLName] = useState(props.employee.lname);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    /*
    var employee = {
      firstName: fname,
      lastName: lname,
      dateOfBirth: dob + "T00:00:00",
      email: email,
      phoneNumber: phone,
      address: {
        addressLine1: address1,
        addressLine2: address2,
        city: city,
        postCode: postcode
      }
    };
    */
    console.log("submit");

    handleClose();
  };

  return (
    <>
      <IconButton color="primary" aria-label="edit employee" component="span" onClick={handleClickOpen}>
        <EditIcon className={classes.edtIcon} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please update the employees detials.
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
