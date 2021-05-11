import * as types from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return {
        loading: true,
      };
    case types.REGISTER_SUCCESS:
      return action.user;

    case types.REGISTER_FAILURE:
      return {
        error: action.error,
      };

    case types.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case types.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case types.LOGIN_FAILURE:
      return {};

    case types.LOGOUT:
      return {};
    case types.FORGOT_PASSWORD_REQUEST:
      return {
        user: action.user,
      };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        user: action.user,
      };
    case types.FORGOT_PASSWORD_FAILURE:
      return {};
    case types.RESET_PASSWORD_REQUEST:
      return {
        user: action.user,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        user: action.user,
      };
    case types.RESET_PASSWORD_FAILURE:
      return {};
    default:
      return state;
  }
}
