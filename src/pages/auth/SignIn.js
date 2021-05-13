import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";

import { Link, withRouter } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

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

const clientId =
  '27034210086-um5lrd33ulg207bqv0o40mvptlqno6mv.apps.googleusercontent.com';

class SignIn extends React.Component {
  state = {
    loading: false,
    user: {},
    role_permissions: [],
    rememberMe: true,
    hour: null,
    values: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    this.getHour();
    const newState = { ...this.state };
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const values = rememberMe ? JSON.parse(localStorage.getItem("values")) : "";
    newState.values["email"] = values.email;
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
      errors[0] === "email" &&
      errors.length === 1 &&
      values.email !== ""
    ) {
      newState.toastrInstance = "error";
      newState.toastrTitle = "";
      newState.toastrMessage = "Email is not valid";
    } else if (
      errors[0] === "email" &&
      errors.length === 1 &&
      values.email === ""
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
    const { email, password } = this.state.values;
    const { rememberMe, values } = this.state;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("values", rememberMe ? JSON.stringify(values) : "");
    this.props.login(email, password).then((user) => {
      if (user) {
        if (user.status === 200) {
          this.props.getUser().then((user) => {
            this.setState({ loading: false });
            this.props.history.push(from)
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
    
    const mystyle = {
      marginTop: "20px"
    };

    const buttonStyle = {
      borderColor: "#e7e7e7",
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      font: "OriginalFont"

    };

    const onSuccess = () => {
      console.log('Login made successfully');
      alert('Login made successfully');
    };

    const onFailure = (res) => {
      console.log('Login failed: res:', res);
      alert(
        `Failed to login.`
      );
    };

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
                  ? this.state.user.email === this.state.values.email &&
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
                    name="email"
                    value={this.state.values.email || ""}
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
                      this.handleFieldChange("email", event.target.value)
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
                  <div style={mystyle} >
                  <GoogleLogin
                   clientId={clientId}  
                   render={ renderProps => (
                    <Button style={buttonStyle}
                    color="white"
                    borderColor="#e7e7e7"
                    disabled={loading ? true : false}
                    size="lg"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                   >
                   <img src="https://raw.githubusercontent.com/Sivanesh-S/react-google-authentication/8d828c5b494f27293ae5c468e5089ac0ccb6aa94/public/icons/google.svg"
                   height="30px" width="30px" style={{paddingRight: 10}} />
                     Sign in with Google</Button>
                  )}                 
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                  />
                  </div>
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
