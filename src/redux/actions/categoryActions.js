import * as types from "../constants";
import { categoryService } from "../../services/apiServices/categoryService";
import { alertActions } from "./alertActions";

export const categoryActions = {
  create,
  getCategories,
  update,
  deleteCategory
};

function create(category) {
  return dispatch => {
    dispatch(request({ category }));

    return categoryService.create(category).then(
      category => {
        dispatch(success(category));
        return category;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(category) {
    return { type: types.CREATE_NEW_CATEGORY_REQUEST, category };
  }
  function success(category) {
    return { type: types.CREATE_NEW_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_CATEGORY_FAILURE, error };
  }
}

function getCategories() {
  return dispatch => {
    dispatch(request());

    return categoryService.getCategories().then(
      categories => dispatch(success(categories)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_CATEGORIES_REQUEST };
  }
  function success(categories) {
    return {
      type: types.GET_CATEGORIES_SUCCESS,
      categories
    };
  }
  function failure(error) {
    return { type: types.GET_CATEGORIES_FAILURE, error };
  }
}

function update(category, id) {
  return dispatch => {
    dispatch(request({ category }));

    return categoryService.update(category, id).then(
      category => {
        dispatch(success(category));
        return category;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(category) {
    return { type: types.UPDATE_CATEGORY_REQUEST, category };
  }
  function success(category) {
    return { type: types.UPDATE_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: types.UPDATE_CATEGORY_FAILURE, error };
  }
}

function deleteCategory( id) {
  return (dispatch) => {
    dispatch(request( ));

    return categoryService.deleteCategory( id).then(
      (category) => {
        dispatch(success(category));
        return category;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(category) {
    return { type: types.DELETE_CATEGORY_REQUEST, category };
  }
  function success(category) {
    return { type: types.DELETE_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: types.DELETE_CATEGORY_FAILURE, error };
  }
}
