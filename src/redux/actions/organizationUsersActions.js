import * as types from "../constants";
import { usersStaffService } from "../../services/apiServices/usersStaffService";

export const organizationUsersActions = {
  inviteUser,
  getUsers,
  getAllUsers,
  // getUserTypes,
  updateUser,
  deleteUser,
};

function deleteUser(userId) {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.deleteUser(userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.DELETE_ORGANIZATION_USERS_REQUEST };
  }
  function success(user) {
    return { type: types.DELETE_ORGANIZATION_USERS_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.DELETE_ORGANIZATION_USERS_FAILURE, error };
  }
}

function inviteUser(user) {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.inviteUser(user).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.INVITE_ORGANIZATION_USERS_REQUEST };
  }
  function success(user) {
    return { type: types.INVITE_ORGANIZATION_USERS_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.INVITE_ORGANIZATION_USERS_FAILURE, error };
  }
}

function updateUser(user, userId) {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.updateUser(user, userId).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_USERS_REQUEST };
  }
  function success(user) {
    return { type: types.UPDATE_ORGANIZATION_USERS_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_USERS_FAILURE, error };
  }
}

function getUsers(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.getUsers(pageSize, page, filter).then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ORGANIZATION_USERS_REQUEST };
  }
  function success(users) {
    return { type: types.GET_ORGANIZATION_USERS_SUCCESS, users };
  }
  function failure(error) {
    return { type: types.GET_ORGANIZATION_USERS_FAILURE, error };
  }
}

function getAllUsers() {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.getAllUsers().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ALL_ORGANIZATION_USERS_REQUEST };
  }
  function success(users) {
    return { type: types.GET_ALL_ORGANIZATION_USERS_SUCCESS, users };
  }
  function failure(error) {
    return { type: types.GET_ALL_ORGANIZATION_USERS_FAILURE, error };
  }
}

// function getUserTypes() {
//   return (dispatch) => {
//     dispatch(request());

//     return usersStaffService.getUserTypes().then(
//       (users) => dispatch(success(users)),
//       (error) => dispatch(failure(error))
//     );
//   };

//   function request() {
//     return { type: types.GET_USER_TYPES_REQUEST };
//   }
//   function success(users) {
//     return { type: types.GET_USER_TYPES_SUCCESS, users };
//   }
//   function failure(error) {
//     return { type: types.GET_USER_TYPES_FAILURE, error };
//   }
// }

function updateOrganization(organization, id) {
  return (dispatch) => {
    dispatch(request());

    return usersStaffService.updateOrganization(organization, id).then(
      (organization) => dispatch(success(organization)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_REQUEST };
  }
  function success(organization) {
    return { type: types.UPDATE_ORGANIZATION_SUCCESS, organization };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_FAILURE, error };
  }
}
