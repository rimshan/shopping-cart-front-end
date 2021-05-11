import axios from "axios";
export const brandService = {
  create,
  getBrands
};

const API_URL = process.env.REACT_APP_API_URL;

function create(brand, organization_id) {
  return axios({
    method: "post",
    url: API_URL + `brand/${organization_id}`,
    data: { name: brand }
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
    .then(manufacturers => {
      return manufacturers;
    });
}
