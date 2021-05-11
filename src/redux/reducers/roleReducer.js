import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_ROLES_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ROLES_SUCCESS:
      return action.roles;

    case types.GET_ROLES_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ROLE_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ROLE_SUCCESS:
      return action.role;

    case types.GET_ROLE_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ROLE_PERMISSIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ROLE_PERMISSIONS_SUCCESS:
      return { role_permissions: action.role_permissions };

    case types.GET_ROLE_PERMISSIONS_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_ROLES_REQUEST:
      return {
        loading: true,
      };
    case types.CREATE_ROLES_SUCCESS:
      return action.role;

    case types.CREATE_ROLES_FAILURE:
      return {
        error: action.error,
      };

    case types.UPDATE_ROLES_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ROLES_SUCCESS:
      return action.role;

    case types.UPDATE_ROLES_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
