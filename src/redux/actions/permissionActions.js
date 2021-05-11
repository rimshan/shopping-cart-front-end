import * as types from "../constants";
import { permissionService } from "../../services/apiServices/permissionService";

export const permissionActions = {
  getPermissions,
  getRolePermissions,
};

function getPermissions() {
  return (dispatch) => {
    dispatch(request());

    return permissionService.getPermissions().then(
      (permissions) => dispatch(success(permissions)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_PERMISSIONS_REQUEST };
  }
  function success(permissions) {
    return { type: types.GET_PERMISSIONS_SUCCESS, permissions };
  }
  function failure(error) {
    return { type: types.GET_PERMISSIONS_FAILURE, error };
  }
}

function getRolePermissions(role_id, organization_id) {
  return (dispatch) => {
    dispatch(request());
    return permissionService.getRolePermissions(role_id, organization_id).then(
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
