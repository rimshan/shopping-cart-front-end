import axios from "axios";
import { error } from "jquery";
export const contactService = {
  getCustomerContacts,
  getVendorContacts,
  createNewContact,
  updateContact,
  getVendorContactsWithFilters,
  getCustomerContactsWithFilters,
  getAllContacts,
};

const API_URL = process.env.REACT_APP_API_URL;

function getCustomerContacts(pageSize, page) {
  return axios({
    method: "get",
    url: API_URL + `customerContacts`,
    params: {
      pageSize: pageSize,
      page: page,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getAllContacts() {
  return axios({
    method: "get",
    url: API_URL + `contacts`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getVendorContacts(pageSize, page) {
  return axios({
    method: "get",
    url: API_URL + `vendorContacts`,
    params: {
      pageSize: pageSize,
      page: page,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getVendorContactsWithFilters(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `vendorContacts`,
    data: { filters: filter },
    params: {
      pageSize: pageSize,
      page: page,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getCustomerContactsWithFilters(pageSize, page, filter) {
  return axios({
    method: "post",
    url: API_URL + `customerContacts`,
    data: { filters: filter },
    params: {
      pageSize: pageSize,
      page: page,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function createNewContact(contact) {
  return axios({
    method: "post",
    url: API_URL + `contact`,
    data: contact,
  })
    .then((response) => {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function updateContact(contact, id) {
  return axios({
    method: "put",
    url: API_URL + `contact/${id}`,
    data: contact,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
}
