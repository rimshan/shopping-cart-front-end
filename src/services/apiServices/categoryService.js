import axios from "axios";
export const categoryService = {
  create,
  getCategories,
  update,
  deleteCategory
};

const API_URL = process.env.REACT_APP_API_URL;

function create(category) {
  return axios({
    method: "post",
    url: API_URL + `categories/`,
    data:  category 
  })
    .then(function(response) {
      return response;
    })
    .catch(function(response) {
      return response;
    });
}

function update(category, id) {
  return axios({
    method: "put",
    url: API_URL + `categories/${id}`,
    data:  category 
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


function deleteCategory( id) {
  return axios({
    method: "delete",
    url: API_URL + `categories/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}
