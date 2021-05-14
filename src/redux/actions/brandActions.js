import * as types from "../constants";
import { brandService } from "../../services/apiServices/brandService";
import { alertActions } from "./alertActions";

export const brandActions = {
  create,
  getBrands,
  update,
  deleteBrand
};

function create(brand, organization_id) {
  return dispatch => {
    dispatch(request({ brand }));

    return brandService.create(brand, organization_id).then(
      brand => {
        dispatch(success(brand));
        return brand;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(brand) {
    return { type: types.CREATE_NEW_BRAND_REQUEST, brand };
  }
  function success(brand) {
    return { type: types.CREATE_NEW_BRAND_SUCCESS, brand };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_BRAND_FAILURE, error };
  }
}

function getBrands() {
  return dispatch => {
    dispatch(request());

    return brandService.getBrands().then(
      brands => dispatch(success(brands)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_BRANDS_REQUEST };
  }
  function success(brands) {
    return {
      type: types.GET_BRANDS_SUCCESS,
      brands
    };
  }
  function failure(error) {
    return { type: types.GET_BRANDS_FAILURE, error };
  }
}


function update(brand, id) {
  return dispatch => {
    dispatch(request({ brand }));

    return brandService.update(brand, id).then(
      brand => {
        dispatch(success(brand));
        return brand;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(brand) {
    return { type: types.UPDATE_BRAND_REQUEST, brand };
  }
  function success(brand) {
    return { type: types.UPDATE_BRAND_SUCCESS, brand };
  }
  function failure(error) {
    return { type: types.UPDATE_BRAND_FAILURE, error };
  }
}

function deleteBrand( id) {
  return (dispatch) => {
    dispatch(request( ));

    return brandService.deleteBrand( id).then(
      (brand) => {
        dispatch(success(brand));
        return brand;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(brand) {
    return { type: types.DELETE_BRAND_REQUEST, brand };
  }
  function success(brand) {
    return { type: types.DELETE_BRAND_SUCCESS, brand };
  }
  function failure(error) {
    return { type: types.DELETE_BRAND_FAILURE, error };
  }
}

