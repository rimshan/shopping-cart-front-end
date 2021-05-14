import * as types from "../constants";
import { productTypeService } from "../../services/apiServices/productTypeService";
import { alertActions } from "./alertActions";

export const productTypeActions = {
  create,
  getProductTypes, 
  update,
  deleteProductType
};

function create(type) {
  return dispatch => {
    dispatch(request({ type }));

    return productTypeService.create(type).then(
      type => {
        dispatch(success(type));
        return type;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(type) {
    return { type: types.CREATE_NEW_PRODUCT_TYPE_REQUEST, type };
  }
  function success(type) {
    return { type: types.CREATE_NEW_PRODUCT_TYPE_SUCCESS, type };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_PRODUCT_TYPE_FAILURE, error };
  }
}

function getProductTypes() {
  return dispatch => {
    dispatch(request());

    return productTypeService.getProductTypes().then(
      type => dispatch(success(type)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_PRODUCT_TYPES_REQUEST };
  }
  function success(type) {
    return {
      type: types.GET_PRODUCT_TYPES_SUCCESS,
      type
    };
  }
  function failure(error) {
    return { type: types.GET_PRODUCT_TYPES_FAILURE, error };
  }
}

function update(type, id) {
  return dispatch => {
    dispatch(request({ type }));

    return productTypeService.update(type, id).then(
      type => {
        dispatch(success(type));
        return type;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(type) {
    return { type: types.UPDATE_PRODUCT_TYPE_REQUEST, type };
  }
  function success(type) {
    return { type: types.UPDATE_PRODUCT_TYPE_SUCCESS, type };
  }
  function failure(error) {
    return { type: types.UPDATE_PRODUCT_TYPE_FAILURE, error };
  }
}


function deleteProductType( id) {
    return (dispatch) => {
      dispatch(request( ));
  
      return productTypeService.deleteProductType(id).then(
        (productType) => {
          dispatch(success(productType));
          return productType;
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
    };
  
    function request(productType) {
      return { type: types.DELETE_PRODUCT_TYPE_REQUEST, productType };
    }
    function success(productType) {
      return { type: types.DELETE_PRODUCT_TYPE_SUCCESS, productType };
    }
    function failure(error) {
      return { type: types.DELETE_PRODUCT_TYPE_FAILURE, error };
    }
  }
