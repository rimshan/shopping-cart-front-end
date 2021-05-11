import axios from "axios";

export const salesOrderService = {
  getSalesOrderCount,
  create,
  getSalesOrdersWithFilters,
  getSalesOrders,
  getSalesOrder,
  updateSalesOrder,
};

const API_URL = process.env.REACT_APP_API_URL;

function getSalesOrderCount() {
  return axios({
    method: "get",
    url: API_URL + `salesOrder/count`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getSalesOrder(id) {
  return axios({
    method: "get",
    url: API_URL + `salesOrder/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function create(salesOrder) {
  return axios({
    method: "post",
    url: API_URL + `salesOrder`,
    data: salesOrder,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function updateSalesOrder(salesOrder, id) {
  return axios({
    method: "put",
    url: API_URL + `salesOrder/${id}`,
    data: salesOrder,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getSalesOrdersWithFilters(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `salesOrders`,
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

function getSalesOrders(pageSize, page) {
  return axios({
    method: "get",
    url: API_URL + `salesOrders`,
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