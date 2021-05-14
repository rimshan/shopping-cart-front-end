import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_PRODUCT_TYPES_REQUEST:
      return {
        loading: true
      };
    case types.GET_PRODUCT_TYPES_SUCCESS:
      return action.type;

    case types.GET_PRODUCT_TYPES_FAILURE:
      return {
        error: action.error
      };
    case types.CREATE_NEW_PRODUCT_TYPE_REQUEST:
      return {
        createNewContact: true,
        loading: true
      };
    case types.CREATE_NEW_PRODUCT_TYPE_SUCCESS:
      return {
        loading: false
      };
    case types.CREATE_NEW_PRODUCT_TYPE_FAILURE:
      return {
        loading: false
      };
    default:
      return state;
  }
}
