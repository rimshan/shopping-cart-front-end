import axios from "axios";
export const organizationService = {
  getOrganization,
  getOrganizationLocations,
  updateOrganization,
  getOrganizationTaxes,
  createOrganizationTaxes,
  createOrganizationLocations,
  updateOrganizationLocation,
  updateOrganizationTax,
  getOrganizationNotification,
  updateOrganizationNotification,
  getAllOrganizationLocations,
};

const API_URL = process.env.REACT_APP_API_URL;

function getOrganization(id) {
  return axios.get(API_URL + `organization/${id}`).then((organization) => {
    return organization;
  });
}

function getOrganizationLocations() {
  return axios.get(API_URL + `locations`).then((locations) => {
    return locations;
  });
}

function getAllOrganizationLocations() {
  return axios.get(API_URL + `allLocations`).then((locations) => {
    return locations;
  });
}

function updateOrganizationLocation(location, id) {
  return axios({
    method: "put",
    url: API_URL + `location/${id}`,
    data: location,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function updateOrganizationTax(tax, id) {
  return axios({
    method: "put",
    url: API_URL + `organizationTaxes/${id}`,
    data: tax,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function getOrganizationTaxes() {
  return axios.get(API_URL + `organizationTaxes`).then((locations) => {
    return locations;
  });
}

function createOrganizationTaxes(tax, organization_id) {
  return axios({
    method: "post",
    url: API_URL + `organizationTaxes/${organization_id}`,
    data: tax,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function createOrganizationLocations(location) {
  return axios({
    method: "post",
    url: API_URL + `locations`,
    data: location,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function updateOrganization(organization, id) {
  return axios({
    method: "put",
    url: API_URL + `organization/${id}`,
    data: organization,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}

function getOrganizationNotification(organization_id) {
  return axios
    .get(API_URL + `organization/notifications/${organization_id}`)
    .then((notifications) => {
      return notifications;
    });
}

function updateOrganizationNotification(notification, id) {
  return axios({
    method: "put",
    url: API_URL + `organization/notifications/${id}`,
    data: notification,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}
