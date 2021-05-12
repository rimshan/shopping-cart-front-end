import * as types from "../constants";
import { authService } from "../../services/apiServices/authService";
import { alertActions } from "./alertActions";

export const authActions = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getuser,
};

function register(user) {
  return (dispatch) => {
    dispatch(request({ user }));

    return authService.register(user).then(
      (user) => {
        dispatch(success(user));
        return user;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: types.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: types.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.REGISTER_FAILURE, error };
  }
}

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    return authService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        return user;
      },
      (error) => {
        console.log(error);
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: types.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: types.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.LOGIN_FAILURE, error };
  }
}

function logout() {
  authService.logout();
  return { type: types.LOGOUT };
}

function forgotPassword(email) {
  return (dispatch) => {
    dispatch(request({ email }));

    return authService.forgotPassword(email).then(
      (user) => {
        dispatch(success(user));
        return user;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: types.FORGOT_PASSWORD_REQUEST, user };
  }
  function success(user) {
    return { type: types.FORGOT_PASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.FORGOT_PASSWORD_FAILURE, error };
  }
}

function resetPassword(email, password, c_password, token) {
  return (dispatch) => {
    dispatch(request({ email }));

    authService.resetPassword(email, password, c_password, token).then(
      (user) => {
        console.log(user);
        dispatch(success(user));
        return user;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: types.RESET_PASSWORD_REQUEST, user };
  }
  function success(user) {
    return { type: types.RESET_PASSWORD_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.RESET_PASSWORD_FAILURE, error };
  }
}

function getuser() {
  return (dispatch) => {
    dispatch(request());

    return authService.getUser().then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_USER_REQUEST };
  }
  function success(user) {
    return { type: types.GET_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.GET_USER_FAILURE, error };
  }
}
