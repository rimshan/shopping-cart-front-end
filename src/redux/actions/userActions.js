import * as types from "../constants";
import { userService } from "../../services/apiServices/userService";

export const userActions = {
  updateUser
};

function updateUser(user) {
  return dispatch => {
    dispatch(request());

    return userService.updateUser(user).then(
      user => dispatch(success(user)),
      error => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_USER_REQUEST };
  }
  function success(user) {
    return { type: types.UPDATE_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: types.UPDATE_USER_FAILURE, error };
  }
}
