import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_PERMISSIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_PERMISSIONS_SUCCESS:
      return { permissions: action.permissions };

    case types.GET_PERMISSIONS_FAILURE:
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
    default:
      return state;
  }
}
