import * as types from "../constants";
import { salesOrderService } from "../../services/apiServices/salesOrderService";

export const salesOrderActions = {
  getSalesOrderCount,
  create,
  getSalesOrdersWithFilters,
  getSalesOrders,
  getSalesOrder,
  update,
  getSalesOrderStats
};

function getSalesOrderCount() {
  return (dispatch) => {
    dispatch(request());

    return salesOrderService.getSalesOrderCount().then(
      (count) => dispatch(success(count)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_ORDER_COUNT_REQUEST };
  }
  function success(count) {
    return { type: types.GET_SALES_ORDER_COUNT_SUCCESS, count };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDER_COUNT_FAILURE, error };
  }
}

function getSalesOrder(id) {
  return (dispatch) => {
    dispatch(request());

    return salesOrderService.getSalesOrder(id).then(
      (count) => dispatch(success(count)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_ORDER_REQUEST };
  }
  function success(order) {
    return { type: types.GET_SALES_ORDER_SUCCESS, order };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDER_FAILURE, error };
  }
}

function create(salesOrder) {
  return (dispatch) => {
    dispatch(request({ salesOrder }));

    return salesOrderService.create(salesOrder).then(
      (salesOrder) => {
        dispatch(success(salesOrder));
        return salesOrder;
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(salesOrder) {
    return { type: types.CREATE_SALES_ORDER_REQUEST, salesOrder };
  }
  function success(salesOrder) {
    return { type: types.CREATE_SALES_ORDER_SUCCESS, salesOrder };
  }
  function failure(error) {
    return { type: types.CREATE_SALES_ORDER_FAILURE, error };
  }
}

function update(salesOrder, id) {
  return (dispatch) => {
    dispatch(request({ salesOrder }));

    return salesOrderService.updateSalesOrder(salesOrder, id).then(
      (salesOrder) => {
        dispatch(success(salesOrder));
        return salesOrder;
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(salesOrder) {
    return { type: types.UPDATE_SALES_ORDER_REQUEST, salesOrder };
  }
  function success(salesOrder) {
    return { type: types.UPDATE_SALES_ORDER_SUCCESS, salesOrder };
  }
  function failure(error) {
    return { type: types.UPDATE_SALES_ORDER_FAILURE, error };
  }
}

function getSalesOrdersWithFilters(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return salesOrderService
      .getSalesOrdersWithFilters(pageSize, page, filter)
      .then(
        (sales_orders) => dispatch(success(sales_orders)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_SALES_ORDERS_WITH_FILTERS_REQUEST };
  }
  function success(sales_orders) {
    return { type: types.GET_SALES_ORDERS_WITH_FILTERS_SUCCESS, sales_orders };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDERS_WITH_FILTERS_FAILURE, error };
  }
}

function getSalesOrders() {
  return (dispatch) => {
    dispatch(request());

    return salesOrderService.getSalesOrders().then(
      (orders) => dispatch(success(orders)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_ORDERS_REQUEST };
  }
  function success(orders) {
    return { type: types.GET_SALES_ORDERS_SUCCESS, orders };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDERS_FAILURE, error };
  }
}

function getSalesOrderStats() {
  return (dispatch) => {
    dispatch(request());

    return salesOrderService.getSalesOrdersStats().then(
      (orders) => dispatch(success(orders)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_ORDERS_REQUEST };
  }
  function success(orders) {
    return { type: types.GET_SALES_ORDERS_SUCCESS, orders };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDERS_FAILURE, error };
  }
}
