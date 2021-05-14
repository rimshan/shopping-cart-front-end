import axios from "axios";
export const itemService = {
  createNewItem,
  getAllItems,
  getItems,
  getItem,
  getItemDetails,
  updateItem,
  getItemOptions,
  getItemValues,
  createItemOptions,
  createItemVariantValues,
  deleteItem
};

const API_URL = process.env.REACT_APP_API_URL;

function createNewItem(item) {


  return axios({
    method: "post",
    url: API_URL + `products/`,
    data: item,
    
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function updateItem(item, id) {
  return axios({
    method: "put",
    url: API_URL + `products/${id}`,
    data: item,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function deleteItem( id) {
  return axios({
    method: "delete",
    url: API_URL + `products/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}


function getAllItems(organization_id, pageSize) {
  return axios({
    method: "get",
    url: API_URL + `products/`,
    params: {
      pageSize: pageSize,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getItemDetails() {
  return axios({
    method: "get",
    url: API_URL + `itemDetails`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getItem(id) {
  return axios.get(API_URL + `products/${id}`).then((item) => {
    return item;
  });
}

function getItems() {
  return axios.get(API_URL + `products/`).then((items) => {
    return items;
  });
}

function getItemOptions(organization_id) {
  return axios
    .get(API_URL + `itemOptions/${organization_id}`)
    .then((itemOptions) => {
      return itemOptions;
    });
}

function getItemValues() {
  return axios.get(API_URL + `itemValues`).then((itemOptions) => {
    return itemOptions;
  });
}

function createItemOptions(option, organization_id) {
  return axios({
    method: "post",
    url: API_URL + `itemOption/${organization_id}`,
    data: { item_variants: option },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function createItemVariantValues(values) {
  return axios({
    method: "post",
    url: API_URL + `itemVariantValues`,
    data: { item_variant_values: values },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}
