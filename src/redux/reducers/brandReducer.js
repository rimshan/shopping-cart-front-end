import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_BRANDS_REQUEST:
      return {
        loading: true
      };
    case types.GET_BRANDS_SUCCESS:
      return action.brands;

    case types.GET_BRANDS_FAILURE:
      return {
        error: action.error
      };
    case types.CREATE_NEW_BRAND_REQUEST:
      return {
        createNewContact: true,
        loading: true
      };
    case types.CREATE_NEW_BRAND_SUCCESS:
      return {
        loading: false
      };
    case types.CREATE_NEW_BRAND_FAILURE:
      return {
        loading: false
      };
    default:
      return state;
  }
}
