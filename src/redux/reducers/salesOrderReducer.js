import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_SALES_ORDER_COUNT_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_ORDER_COUNT_SUCCESS:
      return { count: action.count };

    case types.GET_SALES_ORDER_COUNT_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_SALES_ORDER_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_ORDER_SUCCESS:
      return { count: action.sales_order };

    case types.GET_SALES_ORDER_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_SALES_ORDERS_WITH_FILTERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_ORDERS_WITH_FILTERS_SUCCESS:
      return { count: action.sales_orders };

    case types.GET_SALES_ORDERS_WITH_FILTERS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_SALES_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_ORDERS_SUCCESS:
      return { count: action.sales_orders };

    case types.GET_SALES_ORDERS_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_SALES_ORDER_REQUEST:
      return {
        createNewItem: true,
        loading: true,
      };
    case types.CREATE_SALES_ORDER_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_SALES_ORDER_FAILURE:
      return {
        loading: false,
      };

    case types.UPDATE_SALES_ORDER_REQUEST:
      return {
        UPDATENewItem: true,
        loading: true,
      };
    case types.UPDATE_SALES_ORDER_SUCCESS:
      return {
        loading: false,
      };
    case types.UPDATE_SALES_ORDER_FAILURE:
      return {
        loading: false,
      };

    default:
      return state;
  }
}
