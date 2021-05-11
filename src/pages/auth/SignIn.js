import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";

import { Link, withRouter } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Spinner,
} from "reactstrap";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import { toastr } from "react-redux-toastr";

import Avatar from "react-avatar";

import avatar from "../../assets/img/avatars/avatar.jpg";
import AvField from "availity-reactstrap-validation/lib/AvField";

class SignIn extends React.Component {
  state = {
    loading: false,
    user: {},
    role_permissions: [],
    rememberMe: true,
    hour: null,
    values: {
      username: "",
      password: "",
    },
  };

  componentDidMount() {
    this.getHour();
    const newState = { ...this.state };
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const values = rememberMe ? JSON.parse(localStorage.getItem("values")) : "";
    newState.values["username"] = values.username;
    newState.values["password"] = values.password;
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      newState,
    });
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour,
    });
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

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
  };

  handleInvalidSubmit = (event, errors, values) => {
    const newState = { ...this.state };
    if (
      errors[0] === "username" &&
      errors.length === 1 &&
      values.username !== ""
    ) {
      newState.toastrInstance = "error";
      newState.toastrTitle = "";
      newState.toastrMessage = "Email is not valid";
    } else if (
      errors[0] === "username" &&
      errors.length === 1 &&
      values.username === ""
    ) {
      newState.toastrInstance = "error";
      newState.toastrTitle = "";
      newState.toastrMessage = "Email is required";
    } else if (errors[0] === "password" && errors.length === 1) {
      newState.toastrInstance = "error";
      newState.toastrTitle = "";
      newState.toastrMessage = "Password is required";
    } else {
      newState.toastrInstance = "error";
      newState.toastrTitle = "";
      newState.toastrMessage = "Email and Password are required";
    }

    this.setState(newState);

    this.showToastr();
  };

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };
    const { username, password } = this.state.values;
    const { rememberMe, values } = this.state;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("values", rememberMe ? JSON.stringify(values) : "");
    this.props.history.push(from);
    this.props.login(username, password).then((user) => {
      if (user) {
        if (user.status === 200) {
          this.props.getUser().then((user) => {
            this.setState({ loading: false });
            this.props.history.push(from);
          });
        } else {
          this.setState({ loading: false });
          const newState = { ...this.state };
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
    const { hour, loading } = this.state;
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h2>
            {hour < 12 ? `Good Morning, ` : `Good Evening, `} It’s a great day
            today
          </h2>
          <p className="lead">Sign in to your account to continue</p>
        </div>

        <Card>
          <CardBody>
            <div className="m-sm-4">
              <div className="text-center">
                {this.state.user
                  ? this.state.user.email === this.state.values.username &&
                    (this.state.user.last_name ? (
                      <Avatar
                        src={this.state.user.profile_picture_url}
                        name={
                          this.state.user.first_name +
                          " " +
                          this.state.user.last_name
                        }
                        round={true}
                        size="150"
                      />
                    ) : (
                      <Avatar
                        src={this.state.user.profile_picture_url}
                        name={this.state.user.first_name}
                        round={true}
                        size="150"
                      />
                    ))
                  : null}
              </div>
              <AvForm
                onValidSubmit={this.handleSubmit}
                onInvalidSubmit={this.handleInvalidSubmit}
              >
                <FormGroup>
                  <Label>Email</Label>
                  <AvField
                    bsSize="lg"
                    type="email"
                    name="username"
                    value={this.state.values.username || ""}
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
                      this.handleFieldChange("username", event.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <AvField
                    bsSize="lg"
                    type="password"
                    name="password"
                    value={this.state.values.password || ""}
                    placeholder="Enter your password"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Password is required!",
                      },
                    }}
                    onChange={(event) =>
                      this.handleFieldChange("password", event.target.value)
                    }
                  />

                  <small>
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                  </small>
                </FormGroup>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    label="Remember me"
                    onChange={this.handleChange}
                    checked={this.state.rememberMe}
                  />
                </div>
                <div className="text-center mt-3">
                  <Button
                    disabled={loading ? true : false}
                    color="primary"
                    type="submit"
                    size="lg"
                  >
                    {loading ? (
                      <Spinner color="dark" className="mr-2" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </AvForm>
            </div>
          </CardBody>
        </Card>
        <FormGroup>
          <Label>Don't have an account ?</Label>{" "}
          <Link to="/auth/sign-up">Sign up</Link>
        </FormGroup>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  // const { loggingIn } = state.authentication;
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  login: authActions.login,
  getUser: authActions.getuser,
};

export default withRouter(connect(mapState, actionCreators)(SignIn));
