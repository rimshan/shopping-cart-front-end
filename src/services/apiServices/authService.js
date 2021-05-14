import axios from "axios";
import { authHeader } from "../../helpers";
export const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
};

const API_URL = process.env.REACT_APP_API_URL;

function register(user) {
  return axios({
    method: "post",
    url: API_URL + `users/signup`,
    data: user,
  })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function login(email, password) {
  return axios
    .post(API_URL + `users/login`, { email: email, password: password })
    .then((user) => {
      //localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", user.data.token);
      localStorage.setItem("refresh_token", user.data.refresh_token);
      return user;
    })
    .catch(function (error) {
      return error.response;
    });
}
function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  return axios
    .get(API_URL + `auth/logout`)
    .then((user) => {
      //localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      return user;
    })
    .catch(function (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      return error.response;
    });
}

function forgotPassword(email) {
  return axios({
    method: "post",
    url: API_URL + `auth/forgot-password`,
    data: { email: email },
  })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function resetPassword(email, password, c_password, token) {
  return axios
    .post(API_URL + `auth/forgot-password`, {
      email: email,
      password: password,
      c_password: c_password,
      token: token,
    })
    .then((user) => {
      return user;
    });
}

function getUser() {
  // const requestOptions = {
  //   headers: authHeader()
  // };
  return axios.get(API_URL + `users/jwt-test`).then((user) => {
    // localStorage.setItem(
    //   "first_name",
    //   JSON.stringify(user.data.data.first_name)
    // );
    // localStorage.setItem("last_name", JSON.stringify(user.data.data.last_name));
    // localStorage.setItem("user_id", JSON.stringify(user.data.data.user_id));
    // localStorage.setItem(
    //   "organization_id",
    //   JSON.stringify(user.data.data.organization_id)
    // );
    // localStorage.setItem(
    //   "organization_name",
    //   JSON.stringify(user.data.data.name)
    // );
    // localStorage.setItem(
    //   "profile_image_url",
    //   JSON.stringify(user.data.data.profile_image_url)
    // );
    // localStorage.setItem("logo_url", JSON.stringify(user.data.data.logo_url));
    // localStorage.setItem(
    //   "legal_name_of_business",
    //   user.data.data.legal_name_of_business
    // );
    localStorage.setItem("user", JSON.stringify(user.data));

    return user;
  });
}
