import axios from "axios";
export const inventoryService = {
  getInventoriesWithFilters,
  getInventories,
};

const API_URL = process.env.REACT_APP_API_URL;

function getInventories(pageSize, page) {
  return axios({
    method: "get",
    url: API_URL + `inventories`,
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

function getInventoriesWithFilters(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `inventories`,
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
