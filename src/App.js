import React from "react";
import Button from "@material-ui/core/Button";
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

  handleOpenUserFormDialog = () => {
    this.setState({
      isUserFormDialogOpen: true,
    });
  };

  handleCloseUserFormDialog = () => {
    this.setState({ isUserFormDialogOpen: false, indexOfIdToEdit: -1 });
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

  editUser = (user, indexOfIdToEdit) => {
    const { empCode, empName, empAge, empProfession } = user;
    this.setState({ empCode, empName, empAge, empProfession, indexOfIdToEdit });
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
            indexOfIdToEdit={indexOfIdToEdit}
            handleCloseUserFormDialog={this.handleCloseUserFormDialog}
            state={this.state}
          />
        )}
        <UserDetails editUser={this.editUser} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
