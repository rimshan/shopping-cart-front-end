import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_ALL_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ALL_ITEMS_SUCCESS:
      return action.items;

    case types.GET_ALL_ITEMS_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ITEMS_SUCCESS:
      return action.items;

    case types.GET_ITEMS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ITEM_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ITEM_DETAILS_SUCCESS:
      return action.item_details;

    case types.GET_ITEM_DETAILS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ITEM_OPTIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ITEM_OPTIONS_SUCCESS:
      return action.item_options;

    case types.GET_ITEM_OPTIONS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ITEM_VALUES_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ITEM_VALUES_SUCCESS:
      return action.item_values;

    case types.GET_ITEM_VALUES_FAILURE:
      return {
        error: action.error,
      };
    case types.CREATE_NEW_ITEM_REQUEST:
      return {
        createNewItem: true,
        loading: true,
      };
    case types.CREATE_NEW_ITEM_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_NEW_ITEM_FAILURE:
      return {
        loading: false,
      };
    case types.UPDATE_ITEM_REQUEST:
      return {
        updateItem: true,
        loading: true,
      };
    case types.UPDATE_ITEM_SUCCESS:
      return {
        loading: false,
      };
    case types.UPDATE_ITEM_FAILURE:
      return {
        loading: false,
      };

    case types.CREATE_ITEM_OPTIONS_REQUEST:
      return {
        item_option: true,
        loading: true,
      };
    case types.CREATE_ITEM_OPTIONS_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_ITEM_OPTIONS_FAILURE:
      return {
        loading: false,
      };

    case types.CREATE_ITEM_VARIANT_VALUES_REQUEST:
      return {
        // item_option: true,
        loading: true,
      };
    case types.CREATE_ITEM_VARIANT_VALUES_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_ITEM_VARIANT_VALUES_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
