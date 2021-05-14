import axios from "axios";
export const userService = {
  updateUser,
  getUsers,
  getUserOrders,
  getUserByID
};

const API_URL = process.env.REACT_APP_API_URL;

function updateUser(user, id) {
  return axios({
    method: "put",
    url: API_URL + `users/${id}`,
    data: user
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function getUsers() {
  return axios({
    method: "get",
    url: API_URL + `users/`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getUserByID(id) {
  return axios({
    method: "get",
    url: API_URL + `users/userby/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getUserOrders(id) {
  return axios({
    method: "get",
    url: API_URL + `orders/customer/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
