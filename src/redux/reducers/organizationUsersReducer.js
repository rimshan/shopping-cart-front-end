import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.INVITE_ORGANIZATION_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.INVITE_ORGANIZATION_USERS_SUCCESS:
      return action.organization_users;

    case types.INVITE_ORGANIZATION_USERS_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_ORGANIZATION_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ORGANIZATION_USERS_SUCCESS:
      return action.organization_users;

    case types.GET_ORGANIZATION_USERS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ALL_ORGANIZATION_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ALL_ORGANIZATION_USERS_SUCCESS:
      return action.organization_users;

    case types.GET_ALL_ORGANIZATION_USERS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_USER_TYPES_REQUEST:
      return {
        loading: true,
      };
    case types.GET_USER_TYPES_SUCCESS:
      return action.users;

    case types.GET_USER_TYPES_FAILURE:
      return {
        error: action.error,
      };

    case types.UPDATE_ORGANIZATION_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ORGANIZATION_USERS_SUCCESS:
      return {};

    case types.UPDATE_ORGANIZATION_USERS_FAILURE:
      return {
        error: action.error,
      };

    case types.DELETE_ORGANIZATION_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.DELETE_ORGANIZATION_USERS_SUCCESS:
      return {};

    case types.DELETE_ORGANIZATION_USERS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
