import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_INVENTORIES_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORIES_SUCCESS:
      return action.inventories;

    case types.GET_INVENTORIES_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_INVENTORIES_WITH_FILTERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORIES_WITH_FILTERS_SUCCESS:
      return action.inventories;

    case types.GET_INVENTORIES_WITH_FILTERS_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
