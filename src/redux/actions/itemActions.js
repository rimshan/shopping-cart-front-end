import * as types from "../constants";
import { itemService } from "../../services/apiServices/itemService";
import { alertActions } from "./alertActions";

export const itemActions = {
  createNewItem,
  getAllItems,
  getItems,
  updateItem,
  getItemDetails,
  getItemOptions,
  getItemValues,
  createItemOption,
  createItemVariantValues,
};

function createNewItem(item) {
  return (dispatch) => {
    dispatch(request({ item }));

    return itemService.createNewItem(item).then(
      (item) => {
        dispatch(success(item));
        return item;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(item) {
    return { type: types.CREATE_NEW_ITEM_REQUEST, item };
  }
  function success(item) {
    return { type: types.CREATE_NEW_ITEM_SUCCESS, item };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_ITEM_FAILURE, error };
  }
}

function updateItem(item, id) {
  return (dispatch) => {
    dispatch(request({ item }));

    return itemService.updateItem(item, id).then(
      (item) => {
        dispatch(success(item));
        return item;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(item) {
    return { type: types.UPDATE_ITEM_REQUEST, item };
  }
  function success(item) {
    return { type: types.UPDATE_ITEM_SUCCESS, item };
  }
  function failure(error) {
    return { type: types.UPDATE_ITEM_FAILURE, error };
  }
}

function getAllItems(organization_id, pageSize) {
  return (dispatch) => {
    dispatch(request());

    return itemService.getAllItems(organization_id, pageSize).then(
      (items) => dispatch(success(items)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ALL_ITEMS_REQUEST };
  }
  function success(items) {
    return { type: types.GET_ALL_ITEMS_SUCCESS, items };
  }
  function failure(error) {
    return { type: types.GET_ALL_ITEMS_FAILURE, error };
  }
}

function getItems(amount) {
  return (dispatch) => {
    dispatch(request());

    return itemService.getItems(amount).then(
      (items) => dispatch(success(items)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ITEMS_REQUEST };
  }
  function success(items) {
    return { type: types.GET_ITEMS_SUCCESS, items };
  }
  function failure(error) {
    return { type: types.GET_ITEMS_FAILURE, error };
  }
}

function getItemDetails(amount) {
  return (dispatch) => {
    dispatch(request());

    return itemService.getItemDetails().then(
      (item_details) => dispatch(success(item_details)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ITEM_DETAILS_REQUEST };
  }
  function success(item_details) {
    return { type: types.GET_ITEM_DETAILS_SUCCESS, item_details };
  }
  function failure(error) {
    return { type: types.GET_ITEM_DETAILS_FAILURE, error };
  }
}

function getItemOptions(organization_id) {
  return (dispatch) => {
    dispatch(request());

    return itemService.getItemOptions(organization_id).then(
      (item_options) => dispatch(success(item_options)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ITEM_OPTIONS_REQUEST };
  }
  function success(item_options) {
    return { type: types.GET_ITEM_OPTIONS_SUCCESS, item_options };
  }
  function failure(error) {
    return { type: types.GET_ITEM_OPTIONS_FAILURE, error };
  }
}

function getItemValues() {
  return (dispatch) => {
    dispatch(request());

    return itemService.getItemValues().then(
      (item_values) => dispatch(success(item_values)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ITEM_VALUES_REQUEST };
  }
  function success(item_values) {
    return { type: types.GET_ITEM_VALUES_SUCCESS, item_values };
  }
  function failure(error) {
    return { type: types.GET_ITEM_VALUES_FAILURE, error };
  }
}

function createItemOption(option, organization_id) {
  return (dispatch) => {
    dispatch(request({ option }));

    return itemService.createItemOptions(option, organization_id).then(
      (option) => {
        dispatch(success(option));
        return option;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(option) {
    return { type: types.CREATE_ITEM_OPTION_REQUEST, option };
  }
  function success(option) {
    return { type: types.CREATE_ITEM_OPTION_SUCCESS, option };
  }
  function failure(error) {
    return { type: types.CREATE_ITEM_OPTION_FAILURE, error };
  }
}

function createItemVariantValues(values) {
  return (dispatch) => {
    dispatch(request({ values }));

    return itemService.createItemVariantValues(values).then(
      (values) => {
        dispatch(success(values));
        return values;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(values) {
    return { type: types.CREATE_ITEM_VARIANT_VALUES_REQUEST, values };
  }
  function success(values) {
    return { type: types.CREATE_ITEM_VARIANT_VALUES_SUCCESS, values };
  }
  function failure(error) {
    return { type: types.CREATE_ITEM_VARIANT_VALUES_FAILURE, error };
  }
}
