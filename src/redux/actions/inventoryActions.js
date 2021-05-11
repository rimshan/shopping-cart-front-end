import * as types from "../constants";
import { inventoryService } from "../../services/apiServices/inventoryService";

export const inventoryActions = {
  getInventories,
  getInventoriesWithFilters,
};

function getInventories(pageSize, page) {
  return (dispatch) => {
    dispatch(request());

    return inventoryService.getInventories(pageSize, page).then(
      (inventories) => dispatch(success(inventories)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_INVENTORIES_REQUEST };
  }
  function success(inventories) {
    return { type: types.GET_INVENTORIES_SUCCESS, inventories };
  }
  function failure(error) {
    return { type: types.GET_INVENTORIES_FAILURE, error };
  }
}

function getInventoriesWithFilters(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return inventoryService
      .getInventoriesWithFilters(pageSize, page, filter)
      .then(
        (inventories) => dispatch(success(inventories)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_INVENTORIES_WITH_FILTERS_REQUEST };
  }
  function success(inventories) {
    return { type: types.GET_INVENTORIES_WITH_FILTERS_SUCCESS, inventories };
  }
  function failure(error) {
    return { type: types.GET_INVENTORIES_WITH_FILTERS_FAILURE, error };
  }
}
