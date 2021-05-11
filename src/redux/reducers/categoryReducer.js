import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_CATEGORIES_REQUEST:
      return {
        loading: true
      };
    case types.GET_CATEGORIES_SUCCESS:
      return action.categories;

    case types.GET_CATEGORIES_FAILURE:
      return {
        error: action.error
      };
    case types.CREATE_NEW_CATEGORY_REQUEST:
      return {
        createNewContact: true,
        loading: true
      };
    case types.CREATE_NEW_CATEGORY_SUCCESS:
      return {
        loading: false
      };
    case types.CREATE_NEW_CATEGORY_FAILURE:
      return {
        loading: false
      };
    default:
      return state;
  }
}
