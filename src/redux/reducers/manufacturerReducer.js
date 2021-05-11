import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_MANUFACTURERS_REQUEST:
      return {
        loading: true
      };
    case types.GET_MANUFACTURERS_SUCCESS:
      return action.manufacturers;

    case types.GET_MANUFACTURERS_FAILURE:
      return {
        error: action.error
      };
    case types.CREATE_NEW_MANUFACTURER_REQUEST:
      return {
        createNewContact: true,
        loading: true
      };
    case types.CREATE_NEW_MANUFACTURER_SUCCESS:
      return {
        loading: false
      };
    case types.CREATE_NEW_MANUFACTURER_FAILURE:
      return {
        loading: false
      };
    default:
      return state;
  }
}
