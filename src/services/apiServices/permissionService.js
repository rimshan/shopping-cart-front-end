import axios from "axios";
export const permissionService = {
  getPermissions,
  getRolePermissions,
};

const API_URL = process.env.REACT_APP_API_URL;

function getPermissions() {
  return axios({
    method: "get",
    url: API_URL + `permissions`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getRolePermissions(role_id, organization_id) {
  return axios({
    method: "get",
    url: API_URL + `rolePermissions`,
    params: {
      role_id: role_id,
      organization_id: organization_id,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
