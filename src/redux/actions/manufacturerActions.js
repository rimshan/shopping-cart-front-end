import * as types from "../constants";
import { manufacturerService } from "../../services/apiServices/manufacturerService";
import { alertActions } from "./alertActions";

export const manufacturerActions = {
  create,
  getManufacturers
};

function create(manufacturer, organization_id) {
  return dispatch => {
    dispatch(request({ manufacturer }));

    return manufacturerService.create(manufacturer, organization_id).then(
      manufacturer => {
        dispatch(success(manufacturer));
        return manufacturer;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(manufacturer) {
    return { type: types.CREATE_NEW_MANUFACTURER_REQUEST, manufacturer };
  }
  function success(manufacturer) {
    return { type: types.CREATE_NEW_MANUFACTURER_SUCCESS, manufacturer };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_MANUFACTURER_FAILURE, error };
  }
}

function getManufacturers() {
  return dispatch => {
    dispatch(request());

    return manufacturerService.getManufacturers().then(
      manufacturers => dispatch(success(manufacturers)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_MANUFACTURERS_REQUEST };
  }
  function success(manufacturers) {
    return {
      type: types.GET_MANUFACTURERS_SUCCESS,
      manufacturers
    };
  }
  function failure(error) {
    return { type: types.GET_MANUFACTURERS_FAILURE, error };
  }
}
