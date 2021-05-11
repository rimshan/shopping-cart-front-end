import axios from "axios";
export const rolesService = {
  getRoles,
  createRole,
  getRolePermissions,
  updateRole,
  getRole,
};

const API_URL = process.env.REACT_APP_API_URL;

function getRoles() {
  return axios({
    method: "get",
    url: API_URL + `roles`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getRole(role_id) {
  return axios({
    method: "get",
    url: API_URL + `role/${role_id}`,
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
      localStorage.setItem(
        "role_permissions",
        JSON.stringify(response.data.data)
      );
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function createRole(role) {
  return axios({
    method: "post",
    url: API_URL + `role`,
    data: role,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function updateRole(role, role_id) {
  return axios({
    method: "put",
    url: API_URL + `role/${role_id}`,
    data: role,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
