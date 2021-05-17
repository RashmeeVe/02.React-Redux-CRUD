import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import store from "./store";
import * as actions from "./actionTypes";

const styles = {
  TextFieldDivs: {
    paddingBottom: "15px",
  },

  TextFieldContainerDiv: {
    display: "flex",
    flexDirection: "column",
  },

  CreateUpdateUserFormFields: {
    width: "100%",
  },
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    const { empCode, empName, empAge, empProfession } = this.props.state;

    this.state = {
      errorEmployeeName: "",
      errorEmployeeAge: "",
      empCode: empCode,
      empName: empName,
      empAge: empAge,
      empProfession: empProfession,
    };
  }

  handleFormEntries = (event) => {
    const { name, value } = event.target;
    // this.setState({ [name]: value });
    // return true;
    let errorEmployeeAge, errorEmployeeName;
    if (name === "empName" && !value.match(/^[a-zA-Z ]+$/)) {
      errorEmployeeName = "Enter Characters Only";
    }

    if (name === "empAge" && !value.match(/^[0-9]+$/)) {
      errorEmployeeAge = "Enter Numbers Only";
    }

    if (name === "empAge" && value > 99) {
      errorEmployeeAge = "Age should be less than 99";
    }

    this.setState({ [name]: value, errorEmployeeAge, errorEmployeeName });
    return true;
  };

  handleCreateUpdateUser = (event) => {
    event.preventDefault();
    const { empCode, empName, empAge, empProfession } = this.state;
    if (
      empCode.trim() === "" ||
      empName.trim() === "" ||
      empAge.trim() === "" ||
      empProfession.trim() === "" ||
      empAge > 99 ||
      !empAge.match(/^[0-9]+$/) ||
      !empName.match(/^[a-zA-Z ]+$/)
    ) {
      return;
    } else {
      const { indexOfIdToEdit } = this.props;
      indexOfIdToEdit > -1 ? this.updateUser() : this.addUser();
    }
  };

  addUser = () => {
    const { empCode, empName, empAge, empProfession } = this.state;

    store.dispatch({
      type: actions.ADD_USER,
      payload: {
        empCode: empCode,
        empName: empName,
        empAge: empAge,
        empProfession: empProfession,
      },
    });
    this.props.handleCloseUserFormDialog();
  };

  updateUser = () => {
    const { empCode, empName, empAge, empProfession } = this.state;
    const { indexOfIdToEdit } = this.props;
    store.dispatch({
      type: actions.UPDATE_USER,
      payload: {
        indexOfIdToEdit: indexOfIdToEdit,
        empCode: empCode,
        empName: empName,
        empAge: empAge,
        empProfession: empProfession,
      },
    });
    this.props.handleCloseUserFormDialog();
  };

  render() {
    const { fullScreen, classes, indexOfIdToEdit, users } = this.props;

    const { errorEmployeeAge, errorEmployeeName } = this.state;

    let empCode, empName, empAge, empProfession;
    if (indexOfIdToEdit > -1) {
      empCode = users[indexOfIdToEdit].empCode;
      empName = users[indexOfIdToEdit].empName;
      empAge = users[indexOfIdToEdit].empAge;
      empProfession = users[indexOfIdToEdit].empProfession;
    } else {
      empCode = "";
      empName = "";
      empAge = "";
      empProfession = "";
    }

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.isUserFormDialogOpen}
        onClose={this.props.handleCloseUserFormDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {indexOfIdToEdit > -1 ? "Update User" : "Create User"}
        </DialogTitle>
        <form onSubmit={this.handleCreateUpdateUser}>
          {/* <form onSubmit={indexOfIdToEdit > -1 ? this.updateUser : this.addUser}> */}
          <DialogContent>
            <DialogContentText>Enter User Details</DialogContentText>
            <div className={classes.TextFieldContainerDiv}>
              <div className={classes.TextFieldDivs}>
                <TextField
                  name="empCode"
                  placeholder="Employee Code"
                  variant="outlined"
                  className={classes.CreateUpdateUserFormFields}
                  defaultValue={empCode}
                  onChange={this.handleFormEntries}
                  label="Employee Code"
                />
              </div>
              <div className={classes.TextFieldDivs}>
                <TextField
                  name="empName"
                  placeholder="Name"
                  variant="outlined"
                  className={classes.CreateUpdateUserFormFields}
                  multiline
                  defaultValue={empName}
                  onChange={this.handleFormEntries}
                  label={
                    errorEmployeeName ? errorEmployeeName : "Employee Name"
                  }
                  error={errorEmployeeName ? true : false}
                />
              </div>

              <div className={classes.TextFieldDivs}>
                <TextField
                  name="empAge"
                  placeholder="Employee Age"
                  variant="outlined"
                  type="number"
                  className={classes.CreateUpdateUserFormFields}
                  defaultValue={empAge}
                  onChange={this.handleFormEntries}
                  label={errorEmployeeAge ? errorEmployeeAge : "Employee Age"}
                  error={errorEmployeeAge ? true : false}
                />
              </div>

              <div className={classes.TextFieldDivs}>
                <FormControl
                  variant="outlined"
                  className={classes.CreateUpdateUserFormFields}
                >
                  <InputLabel htmlFor="outlined-profession-native-simple">
                    Profession
                  </InputLabel>
                  <Select
                    native
                    defaultValue={empProfession}
                    placeholder="Profession"
                    inputProps={{
                      name: "empProfession",
                      id: "outlined-profession-native-simple",
                    }}
                    onChange={this.handleFormEntries}
                    label="Profession"
                  >
                    <option aria-label="None" value="" />
                    <option value="Graphics Designer">Graphics Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Software Developer">
                      Software Developer
                    </option>
                    <option value="Software Tester">Software Tester</option>
                    <option value="Web Designer">Web Designer</option>
                  </Select>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.handleCloseUserFormDialog}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" variant="contained">
              {indexOfIdToEdit > -1 ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};

UserForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(
  withStyles(styles)(connect(mapStateToProps)(UserForm))
);
