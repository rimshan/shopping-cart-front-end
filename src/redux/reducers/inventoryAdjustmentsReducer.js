import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_INVENTORY_ADJUSTMENT_REASONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORY_ADJUSTMENT_REASONS_SUCCESS:
      return action.reaons;

    case types.GET_INVENTORY_ADJUSTMENT_REASONS_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_SUCCESS:
      return action.adjustments;

    case types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_INVENTORY_ADJUSTMENTS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORY_ADJUSTMENTS_SUCCESS:
      return action.adjustments;

    case types.GET_INVENTORY_ADJUSTMENTS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_INVENTORY_ADJUSTMENT_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORY_ADJUSTMENT_SUCCESS:
      return action.adjustment;

    case types.GET_INVENTORY_ADJUSTMENT_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_INVENTORY_ADJUSTMENT_REQUEST:
      return {
        createNewItem: true,
        loading: true,
      };
    case types.CREATE_INVENTORY_ADJUSTMENT_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_INVENTORY_ADJUSTMENT_FAILURE:
      return {
        loading: false,
      };

    case types.UPDATE_INVENTORY_ADJUSTMENT_REQUEST:
      return {
        UPDATENewItem: true,
        loading: true,
      };
    case types.UPDATE_INVENTORY_ADJUSTMENT_SUCCESS:
      return {
        loading: false,
      };
    case types.UPDATE_INVENTORY_ADJUSTMENT_FAILURE:
      return {
        loading: false,
      };

    default:
      return state;
  }
}
