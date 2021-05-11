export function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  let access_token = localStorage.getItem("access_token");

  if (user && user.statusText === "OK") {
    return { Authorization: "Bearer " + access_token };
  } else {
    return {};
  }
}
