import axios from "axios";
export const productTypeService = {
  create,
  getProductTypes,
  update,
  deleteProductType
};

const API_URL = process.env.REACT_APP_API_URL;

function create(productType) {
  return axios({
    method: "post",
    url: API_URL + `productTypes/`,
    data:  productType 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function getProductTypes() {
  return axios
    .get(API_URL + `productTypes`)
    .then(productTypes => {
      return productTypes;
    });
}


function deleteProductType( id) {
  return axios({
    method: "delete",
    url: API_URL + `productTypes/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function update(category, id) {
  return axios({
    method: "put",
    url: API_URL + `productTypes/${id}`,
    data:  category 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

