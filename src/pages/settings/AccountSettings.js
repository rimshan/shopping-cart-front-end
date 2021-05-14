import React, { Fragment } from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";
import { userActions } from "../../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import { toastr } from "react-redux-toastr";

import {
  AvForm,
} from "availity-reactstrap-validation";

import AvField from "availity-reactstrap-validation/lib/AvField";

const GeneralDetails = props => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        General Details
      </CardTitle>
    </CardHeader>
    <CardBody>
    <AvForm
          model={props.values}
          onInvalidSubmit={props.handleInvalidSubmit}
          onValidSubmit={props.handleSubmit}
        >
          <FormGroup row>
            <Label sm={2} className="text-sm-right required">
              First Name
            </Label>
            <Col sm={6}>
              <AvField
                type="name"
                name="firstName"
                value={props.values.firstName ? props.values.firstName : ""}
                placeholder="Enter First Name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "First Name is required!",
                  },
                  pattern: {
                    value: "^[A-Za-z]+$",
                    errorMessage:
                      "First Name must be composed only with letters",
                  },
                }}
                onChange={(event) =>
                  props.handleFieldChange("firstName", event.target.value)
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Last Name
            </Label>
            <Col sm={6}>
              <AvField
                type="name"
                name="lastName"
                validate={{
                  pattern: {
                    value: "^[A-Za-z]+$",
                    errorMessage:
                      "Last Name must be composed only with letters",
                  },
                }}
                value={props.values.lastName ? props.values.lastName : ""}
                placeholder="Enter Last Name"
                onChange={(event) =>
                  props.handleFieldChange("lastName", event.target.value)
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Email Address
            </Label>
            <Col sm={6}>
              <AvField
                disabled
                type="email"
                name="email"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Email is required!",
                  },
                  email: {
                    errorMessage: "Email is not vaid",
                  },
                }}
                value={props.values.email ? props.values.email : ""}
                placeholder="Enter Email Address"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Contact Number
            </Label>
            <Col sm={6}>
              <AvField
                type="text"
                name="contactNumber"
                validate={{
                  pattern: {
                    value: "^[0-9]+$",
                    errorMessage:
                      "Contact Number must be composed only with numbers",
                  },
                }}
                value={
                  props.values.contactNumber ? props.values.contactNumber : ""
                }
                placeholder="Enter Mobile Number"
                onChange={(event) =>
                  props.handleFieldChange("contactNumber", event.target.value)
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 6, offset: 2 }}>
              <Button
                disabled={props.uploading || props.isDisabled}
                color="primary"
                type="submit"
              >
                {props.uploading ? "Uploading..." : "Save Details"}
              </Button>
            </Col>
          </FormGroup>
        </AvForm>
    </CardBody>
  </Card>
);

const Security = props => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Security
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Password
          </Label>
          <Col sm={10}>
            <Button outline color="primary" onClick={() => props.toggle()}>
              Change Password
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <Modal
        isOpen={props.state.index}
        toggle={() => props.toggle()}
        centered
        size="md"
      >
        <ModalHeader toggle={() => props.toggle()}>Change Password</ModalHeader>
        <ModalBody className="text-center m-3">
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Old Password
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              New Password
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Re Enter
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.toggle()}>
            Update Password
          </Button>
        </ModalFooter>
      </Modal>
    </CardBody>
  </Card>
);

class AccountSettings extends React.Component {
  state = {
    birth_date: new Date(),
    values:{},
    uploading: false,
    isDisabled: true,
  };

  
  showToastr = () => {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
    };

    const toastrInstance =
      this.state.toastrInstance === "error" ? toastr.error : toastr.success;

    toastrInstance(this.state.toastrTitle, this.state.toastrMessage, options);
  };

  setBirthDate = date => {
    this.setState({
      birth_date: date
    });
  };

  toggle = () => {
    this.setState(state => ({
      index: !state.index
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false
    }));
  }

  async componentDidMount() {
    this.getUser();
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.isDisabled = false;
    newState.values[field] = value;
    this.setState(newState);
  };

  getUser = () => {
    this.props.getuser().then((user) => {
      if (user.user) {
        if (user.user.status === 200) {
          const User = user.user.data;
          console.log(User)
          const newState = { ...this.state };
          newState.values = User
          // newState.organizaton_id = user.organizaton_id;
          // newState.values["first_name"] = User.first_name;
          // newState.values["last_name"] = User.last_name;
          // newState.values["email"] = User.email;
          // newState.values["nic"] = User.nic;
          // newState.values["date_of_birth"] = User.date_of_birth;
          // newState.values["contact_number"] = User.contact_number;
          // newState.values["profile_image_url"] = User.profile_image_url;
          this.setState(newState);
        }
      }
    });
  };

  handleInvalidSubmit = () => {
    const newState = { ...this.state };
    newState.toastrInstance = "error";
    newState.toastrTitle = "Error";
    newState.toastrMessage = "Please fill mandatory fields";
    this.setState(newState);

    this.showToastr();
  };

  handleSubmit = () => {
    this.setState({
      uploading: true,
    });
      const user = this.state.values;
      this.props.updateUser(user, user._id).then((user) => {
        if (user.user) {
          if (user.user.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify(this.state.values)
            );
            this.setState({
              isDisabled: true,
              uploading: false,
              toastrInstance: "success",
              toastrTitle: "Success",
              toastrMessage: "You have successfully updated the profile",
            });
            this.showToastr();
            this.props.history.push("/settings", {
              activeTab: 1,
            });
          } else {
            this.setState({
              uploading: false,
              toastrInstance: "error",
              toastrTitle: "Error",
              toastrMessage: "Somthing went wrong please try again",
            });
            this.showToastr();
          }
        }
      });
    
  };



  render() {
    const { uploading,isDisabled, values } = this.state;
    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Account</h1>
        <GeneralDetails
          values={values}
          handleFieldChange={this.handleFieldChange}
          handleInvalidSubmit={this.handleInvalidSubmit}
          handleSubmit={this.handleSubmit}    
          uploading={uploading}
          isDisabled={isDisabled}
        />
        {/* <Security toggle={this.toggle} state={this.state} /> */}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getuser: authActions.getuser,
  updateUser: userActions.updateUser,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AccountSettings)
);
