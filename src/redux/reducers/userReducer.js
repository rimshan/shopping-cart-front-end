import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {};

    case types.UPDATE_USER_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_USERS_SUCCESS:
      return {};

    case types.GET_USERS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_USER_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.GET_USER_BY_ID_SUCCESS:
      return {};

    case types.GET_USER_BY_ID_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_USER_ORDERS_SUCCESS:
      return {};

    case types.GET_USER_ORDERS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
