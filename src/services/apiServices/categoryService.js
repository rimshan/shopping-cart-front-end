import axios from "axios";
export const categoryService = {
  create,
  getCategories
};

const API_URL = process.env.REACT_APP_API_URL;

function create(category) {
  return axios({
    method: "post",
    url: API_URL + `category`,
    data: { name: category }
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function getCategories() {
  return axios.get(API_URL + `categories`).then(manufacturers => {
    return manufacturers;
  });
}
