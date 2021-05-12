import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input,
  Spinner,
} from "reactstrap";

import { AvForm } from "availity-reactstrap-validation";

import { toastr } from "react-redux-toastr";
import AvField from "availity-reactstrap-validation/lib/AvField";

const SignUpForm = (props) => (
  <React.Fragment>
    <div className="text-center mt-4">
      <h1 className="h2">Create your Account</h1>
      <p className="lead">Please add a password to start with your bookings</p>
    </div>

    <Card>
      <CardBody>
        <div className="m-sm-4">
          <AvForm
            onValidSubmit={props.handleSubmit}
            onInvalidSubmit={props.handleInvalidSubmit}
          >
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>First Name</Label>
                  <AvField
                    bsSize="lg"
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
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
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Last Name</Label>
                  <AvField
                    bsSize="lg"
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
                    validate={{
                      pattern: {
                        value: "^[A-Za-z]+$",
                        errorMessage:
                          "Last Name must be composed only with letters",
                      },
                    }}
                    onChange={(event) =>
                      props.handleFieldChange("lastName", event.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Email</Label>
              <AvField
                bsSize="lg"
                type="email"
                name="email"
                placeholder="Enter your email"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Email is required!",
                  },
                  email: {
                    errorMessage: "Email is not vaid",
                  },
                }}
                onChange={(event) =>
                  props.handleFieldChange("email", event.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Contact Number</Label>
              <AvField
                bsSize="lg"
                type="text"
                name="contact_number"
                placeholder="Enter your contact number"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Contact Number is required!",
                  },
                  number: {
                    errorMessage:
                      "Contact Number must be composed only with numbers",
                  },
                }}
                onChange={(event) =>
                  props.handleFieldChange("contactNumber", event.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Address</Label>
              <AvField
                bsSize="lg"
                type="text"
                name="userAddress"
                placeholder="Enter your address"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Address is required!",
                  },
                }}
                onChange={(event) =>
                  props.handleFieldChange(
                    "userAddress",
                    event.target.value
                  )
                }
              />
            </FormGroup>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label>Password</Label>
                  <AvField
                    bsSize="lg"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Password is required!",
                      },
                    }}
                    onChange={(event) =>
                      props.handleFieldChange("password", event.target.value)
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <AvField
                    bsSize="lg"
                    type="password"
                    name="c_password"
                    placeholder="Confirm password"
                    required
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Confirm password is required!",
                      },
                      match: {
                        value: "password",
                        errorMessage: "Password does not match",
                      },
                    }}
                    onChange={(event) =>
                      props.handleFieldChange("c_password", event.target.value)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="text-center mt-3">
              <Button
                disabled={props.loading ? true : false}
                color="primary"
                type="submit"
                size="lg"
              >
                {props.loading ? (
                  <Spinner color="dark" className="mr-2" />
                ) : (
                  "Get Access Now"
                )}
              </Button>
            </div>
          </AvForm>
        </div>
      </CardBody>
    </Card>
    <FormGroup>
      <Label>All ready have an account ? </Label>{" "}
      <Link to="/auth/sign-in">Sign in</Link>
    </FormGroup>
  </React.Fragment>
);

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      alert: "",
      user: {},
      rememberMe: true,
      values: {
        role:"2",
        scopes: "admin",
      },
    };
  }

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

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
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
    this.setState({ loading: true });
    const user = this.state.values;
    console.log(user)
    this.props.register(this.state.values).then((user) => {
      if (user) {
        if (user.status === 200) {
          const newState = { ...this.state };
          newState.loading = false;
          newState.toastrInstance = "success";
          newState.toastrTitle = "Success";
          newState.toastrMessage = "You have successfully registered";
          this.setState(newState);

          this.showToastr();
          this.props.history.push("/auth/sign-in");
        } else {
          const newState = { ...this.state };
          newState.loading = false;
          newState.toastrInstance = "error";
          newState.toastrTitle = "Error";
          newState.toastrMessage = user.data.error;
          this.setState(newState);

          this.showToastr();
        }
      }
    });
  };
  render() {
    return (
      <Container>
        <SignUpForm
          handleFieldChange={this.handleFieldChange}
          handleSubmit={this.handleSubmit}
          handleInvalidSubmit={this.handleInvalidSubmit}
          loading={this.state.loading}
        />
      </Container>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  register: authActions.register,
};

export default withRouter(connect(mapState, actionCreators)(SignUp));
