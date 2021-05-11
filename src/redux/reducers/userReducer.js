import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
      return {
        loading: true
      };
    case types.UPDATE_USER_SUCCESS:
      return {};

    case types.UPDATE_USER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
