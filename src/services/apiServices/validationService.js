import axios from "axios";
export const validationService = {
  validate
};

const API_URL = process.env.REACT_APP_API_URL;

function validate(id) {
  return axios.get(API_URL + `validate/${id}`).then(validate => {
    return validate;
  });
}
