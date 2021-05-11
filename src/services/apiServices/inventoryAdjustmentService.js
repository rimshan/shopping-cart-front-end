import axios from "axios";
export const inventoryAdjustmentService = {
  getInventoryAdjustmentsWithFilters,
  getInventoryAdjustmentReasons,
  getInventoryAdjustments,
  getInventoryAdjustment,
  create,
  update,
};

const API_URL = process.env.REACT_APP_API_URL;

function getInventoryAdjustmentReasons() {
  return axios({
    method: "get",
    url: API_URL + `inventoryAdjustmentReasons`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function create(adjustment) {
  return axios({
    method: "post",
    url: API_URL + `inventoryAdjustment`,
    data: adjustment,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function update(adjustment, id) {
  return axios({
    method: "put",
    url: API_URL + `inventoryAdjustment/${id}`,
    data: adjustment,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getInventoryAdjustmentsWithFilters(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `inventoryAdjustments`,
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

function getInventoryAdjustments(pageSize, page) {
  return axios({
    method: "get",
    url: API_URL + `inventoryAdjustments`,
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

function getInventoryAdjustment(id) {
  return axios({
    method: "get",
    url: API_URL + `inventoryAdjustment/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
