import axios from "axios";
export const usersStaffService = {
  inviteUser,
  deleteUser,
  getUsers,
  getAllUsers,
  getUserTypes,
  updateUser,
};

const API_URL = process.env.REACT_APP_API_URL;

function inviteUser(user) {
  return axios({
    method: "post",
    url: API_URL + `user/invite`,
    data: user,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getUsers(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `organization/users`,
    data: { filters: filter },
    params: {
      pageSize: pageSize,
      page: page,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getAllUsers() {
  return axios({
    method: "get",
    url: API_URL + `organizationUsers`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function updateUser(user, userId) {
  return axios({
    method: "put",
    url: API_URL + `organizationUsers/${userId}`,
    data: user,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getUserTypes() {
  return axios({
    method: "get",
    url: API_URL + `lookups/userTypes`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function deleteUser(id) {
  return axios({
    method: "delete",
    url: API_URL + `user/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
