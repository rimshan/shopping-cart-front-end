import axios from "axios";
export const userService = {
  updateUser
};

const API_URL = process.env.REACT_APP_API_URL;

function updateUser(user) {
  return axios({
    method: "put",
    url: API_URL + `user`,
    data: user
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}
