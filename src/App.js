import React from "react";
import Button from "@material-ui/core/Button";
import store from "./store";
import * as actions from "./actionTypes";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import { withStyles } from "@material-ui/styles";

const styles = {
  MainDiv: { width: "100%", textAlign: "right" },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indexOfIdToEdit: -1, isUserFormDialogOpen: false };
  }

  handleFormEntries = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    return true;
  };

  handleOpenUserFormDialog = () => {
    this.setState({
      isUserFormDialogOpen: true,
    });
  };

  handleCloseUserFormDialog = () => {
    this.setState({ isUserFormDialogOpen: false });
  };

  setStateValues = () => {
    this.setState({
      empCode: "",
      empName: "",
      empAge: "",
      empProfession: "",
      indexToUpdateUser: -1,
    });
    this.handleOpenUserFormDialog();
  };

  addUser = (event) => {
    event.preventDefault();
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
    this.handleCloseUserFormDialog();
  };

  updateUser = (event) => {
    event.preventDefault();
    const { indexOfIdToEdit, empCode, empName, empAge, empProfession } =
      this.state;
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
    this.handleCloseUserFormDialog();
    this.setState({ indexOfIdToEdit: -1 });
  };

  editUser = (indexOfIdToEdit) => {
    this.setState({ indexOfIdToEdit });
    this.handleOpenUserFormDialog();
  };

  render() {
    const { indexOfIdToEdit } = this.state;
    const { isUserFormDialogOpen } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.MainDiv}>
        <Button
          variant="contained"
          color="primary"
          // onClick={this.handleOpenUserFormDialog}
          onClick={this.setStateValues}
        >
          Add User
        </Button>

        {isUserFormDialogOpen && (
          <UserForm
            isUserFormDialogOpen={isUserFormDialogOpen}
            handleFormEntries={this.handleFormEntries}
            addUser={this.addUser}
            updateUser={this.updateUser}
            indexOfIdToEdit={indexOfIdToEdit}
            handleCloseUserFormDialog={this.handleCloseUserFormDialog}
          />
        )}
        <UserDetails editUser={this.editUser} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
