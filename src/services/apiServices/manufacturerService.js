import axios from "axios";
export const manufacturerService = {
  create,
  getManufacturers
};

const API_URL = process.env.REACT_APP_API_URL;

function create(manufacturer, organization_id) {
  return axios({
    method: "post",
    url: API_URL + `manufacturer/${organization_id}`,
    data: { name: manufacturer }
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
