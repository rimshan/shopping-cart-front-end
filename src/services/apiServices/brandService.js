import axios from "axios";
export const brandService = {
  create,
  getBrands,
  deleteBrand,
  update
};

const API_URL = process.env.REACT_APP_API_URL;

function create(brand) {
  return axios({
    method: "post",
    url: API_URL + `brands/`,
    data:  brand
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function getBrands() {
  return axios
    .get(API_URL + `brands/`)
    .then(brands => {
      return brands;
    });
}

function deleteBrand( id) {
  return axios({
    method: "delete",
    url: API_URL + `brands/${id}`,
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
    url: API_URL + `brands/${id}`,
    data:  category 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

