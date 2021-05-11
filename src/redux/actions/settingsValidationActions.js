import * as types from "../constants";
import { validationService } from "../../services/apiServices/validationService";
import { alertActions } from "./alertActions";

export const settingsValidationActions = {
  validateSettings
};

function validateSettings(id) {
  return dispatch => {
    dispatch(request({ id }));

    return validationService.validate(id).then(
      validation => {
        dispatch(success(validation));
        return validation;
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(id) {
    return { type: types.VALIDATE_SETTINGS_REQUEST, id };
  }
  function success(id) {
    return { type: types.VALIDATE_SETTINGS_SUCCESS, id };
  }
  function failure(error) {
    return { type: types.VALIDATE_SETTINGS_FAILURE, error };
  }
}
