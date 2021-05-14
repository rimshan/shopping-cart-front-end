import axios from "axios";
export const manufacturerService = {
  create,
  getManufacturers,
  update,
  deleteManufacturer
};

const API_URL = process.env.REACT_APP_API_URL;

function create(manufacturer) {
  return axios({
    method: "post",
    url: API_URL + `manufacturers/`,
    data:  manufacturer 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function getManufacturers() {
  return axios
    .get(API_URL + `manufacturers`)
    .then(manufacturers => {
      return manufacturers;
    });
}


function deleteManufacturer( id) {
  return axios({
    method: "delete",
    url: API_URL + `manufacturers/${id}`,
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
    url: API_URL + `manufacturers/${id}`,
    data:  category 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

