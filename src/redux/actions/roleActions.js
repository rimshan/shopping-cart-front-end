import * as types from "../constants";
import { rolesService } from "../../services/apiServices/rolesService";

export const roleActions = {
  getRole,
  getRoles,
  createRoles,
  getRolePermissions,
  updateRole,
};

function getRoles() {
  return (dispatch) => {
    dispatch(request());

    return rolesService.getRoles().then(
      (roles) => dispatch(success(roles)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ROLES_REQUEST };
  }
  function success(roles) {
    return { type: types.GET_ROLES_SUCCESS, roles };
  }
  function failure(error) {
    return { type: types.GET_ROLES_FAILURE, error };
  }
}

function getRole(role_id) {
  return (dispatch) => {
    dispatch(request());

    return rolesService.getRole(role_id).then(
      (roles) => dispatch(success(roles)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ROLE_REQUEST };
  }
  function success(role) {
    return { type: types.GET_ROLE_SUCCESS, role };
  }
  function failure(error) {
    return { type: types.GET_ROLE_FAILURE, error };
  }
}

function getRolePermissions(role_id, organization_id) {
  return (dispatch) => {
    dispatch(request());
    return rolesService.getRolePermissions(role_id, organization_id).then(
      (role_permissions) => dispatch(success(role_permissions)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ROLE_PERMISSIONS_REQUEST };
  }
  function success(role_permissions) {
    return { type: types.GET_ROLE_PERMISSIONS_SUCCESS, role_permissions };
  }
  function failure(error) {
    return { type: types.GET_ROLE_PERMISSIONS_FAILURE, error };
  }
}

function createRoles(role) {
  return (dispatch) => {
    dispatch(request());

    return rolesService.createRole(role).then(
      (roles) => dispatch(success(roles)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.CREATE_ROLES_REQUEST };
  }
  function success(role) {
    return { type: types.CREATE_ROLES_SUCCESS, role };
  }
  function failure(error) {
    return { type: types.CREATE_ROLES_FAILURE, error };
  }
}

function updateRole(role, role_id) {
  return (dispatch) => {
    dispatch(request());

    return rolesService.updateRole(role, role_id).then(
      (roles) => dispatch(success(roles)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ROLES_REQUEST };
  }
  function success(role) {
    return { type: types.UPDATE_ROLES_SUCCESS, role };
  }
  function failure(error) {
    return { type: types.UPDATE_ROLES_FAILURE, error };
  }
}
