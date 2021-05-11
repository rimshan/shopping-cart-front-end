import * as types from "../constants";
import { inventoryAdjustmentService } from "../../services/apiServices/inventoryAdjustmentService";

export const inventoryAdjustmentActions = {
  getInventoryAdjustmentReasons,
  getInventoryAdjustmentsWithFilters,
  getInventoryAdjustments,
  getInventoryAdjustment,
  create,
  update,
};

function getInventoryAdjustmentReasons() {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService.getInventoryAdjustmentReasons().then(
      (reasons) => dispatch(success(reasons)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_INVENTORY_ADJUSTMENT_REASONS_REQUEST };
  }
  function success(reasons) {
    return { type: types.GET_INVENTORY_ADJUSTMENT_REASONS_SUCCESS, reasons };
  }
  function failure(error) {
    return { type: types.GET_INVENTORY_ADJUSTMENT_REASONS_FAILURE, error };
  }
}

function create(adjustment) {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService.create(adjustment).then(
      (adjustment) => dispatch(success(adjustment)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.CREATE_INVENTORY_ADJUSTMENT_REQUEST };
  }
  function success(adjustment) {
    return { type: types.CREATE_INVENTORY_ADJUSTMENT_SUCCESS, adjustment };
  }
  function failure(error) {
    return { type: types.CREATE_INVENTORY_ADJUSTMENT_FAILURE, error };
  }
}

function update(adjustment, id) {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService.update(adjustment, id).then(
      (adjustment) => dispatch(success(adjustment)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_INVENTORY_ADJUSTMENT_REQUEST };
  }
  function success(adjustment) {
    return { type: types.UPDATE_INVENTORY_ADJUSTMENT_SUCCESS, adjustment };
  }
  function failure(error) {
    return { type: types.UPDATE_INVENTORY_ADJUSTMENT_FAILURE, error };
  }
}

function getInventoryAdjustmentsWithFilters(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService
      .getInventoryAdjustmentsWithFilters(pageSize, page, filter)
      .then(
        (adjustments) => dispatch(success(adjustments)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_REQUEST };
  }
  function success(adjustments) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_SUCCESS,
      adjustments,
    };
  }
  function failure(error) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENTS_WITH_FILTERS_FAILURE,
      error,
    };
  }
}

function getInventoryAdjustments(pageSize, page) {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService
      .getInventoryAdjustments(pageSize, page)
      .then(
        (adjustments) => dispatch(success(adjustments)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_INVENTORY_ADJUSTMENTS_REQUEST };
  }
  function success(adjustments) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENTS_SUCCESS,
      adjustments,
    };
  }
  function failure(error) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENTS_FAILURE,
      error,
    };
  }
}

function getInventoryAdjustment(id) {
  return (dispatch) => {
    dispatch(request());

    return inventoryAdjustmentService.getInventoryAdjustment(id).then(
      (adjustment) => dispatch(success(adjustment)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_INVENTORY_ADJUSTMENT_REQUEST };
  }
  function success(adjustment) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENT_SUCCESS,
      adjustment,
    };
  }
  function failure(error) {
    return {
      type: types.GET_INVENTORY_ADJUSTMENT_FAILURE,
      error,
    };
  }
}
