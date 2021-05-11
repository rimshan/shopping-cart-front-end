import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.VALIDATE_SETTINGS_REQUEST:
      return {
        loading: true
      };
    case types.VALIDATE_SETTINGS_SUCCESS:
      return { validations: action.validations, loading: false };

    case types.VALIDATE_SETTINGS_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
