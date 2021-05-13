import * as types from "../constants";
import { userService } from "../../services/apiServices/userService";

export const userActions = {
  updateUser,
  getusers,
  getuserOrders,
  getuserByID
};

function updateUser(user) {
  return dispatch => {
    dispatch(request());

    return userService.updateUser(user).then(
      user => dispatch(success(user)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_USER_REQUEST };
  }
  function success(user) {
    return { type: types.UPDATE_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.UPDATE_USER_FAILURE, error };
  }
}

function getusers() {
  return (dispatch) => {
    dispatch(request());

    return userService.getUsers().then(
      (customers) => dispatch(success(customers)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_USERS_REQUEST };
  }
  function success(customers) {
    return { type: types.GET_USERS_SUCCESS, customers };
  }
  function failure(error) {
    return { type: types.GET_USERS_FAILURE, error };
  }
}

function getuserByID(id) {
  return (dispatch) => {
    dispatch(request());

    return userService.getUserByID(id).then(
      (customer) => dispatch(success(customer)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_USER_BY_ID_REQUEST };
  }
  function success(customer) {
    return { type: types.GET_USER_BY_ID_SUCCESS, customer };
  }
  function failure(error) {
    return { type: types.GET_USER_BY_ID_FAILURE, error };
  }
}

function getuserOrders(id) {
  return (dispatch) => {
    dispatch(request());

    return userService.getUserOrders(id).then(
      (orders) => dispatch(success(orders)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_USER_ORDERS_REQUEST };
  }
  function success(orders) {
    return { type: types.GET_USER_ORDERS_SUCCESS, orders };
  }
  function failure(error) {
    return { type: types.GET_USER_ORDERS_FAILURE, error };
  }
}
