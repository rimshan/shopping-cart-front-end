import axios from "axios";
export const lookupService = {
  getCountries,
  getIndustries,
  getProductTypes,
  getVariants,
  getDateFormats,
  getFiscalYears,
  getLanguages,
  getTimeZones,
  getContacts,
  getSalesOrderChannels,
  getInventoryUpdateTypes,
};

const API_URL = process.env.REACT_APP_API_URL;

function getCountries() {
  return axios
    .get(API_URL + `lookup/countries`)

    .then((countries) => {
      return countries;
    });
}

function getIndustries() {
  return axios
    .get(API_URL + `lookup/industries`)

    .then((industries) => {
      return industries;
    });
}

function getProductTypes() {
  return axios
    .get(API_URL + `productTypes`)

    .then((types) => {
      return types;
    });
}

function getVariants() {
  return axios
    .get(API_URL + `lookup/variants`)

    .then((variants) => {
      return variants;
    });
}

function getDateFormats() {
  return axios
    .get(API_URL + `lookup/date-formats`)

    .then((dateFormats) => {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem("dateFormats", JSON.stringify(dateFormats));
      return dateFormats;
    });
}

function getFiscalYears() {
  return axios
    .get(API_URL + `lookup/fiscal-years`)

    .then((fiscalYears) => {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem("fiscalYears", JSON.stringify(fiscalYears));
      return fiscalYears;
    });
}

function getLanguages() {
  return axios
    .get(API_URL + `lookup/languages`)

    .then((languages) => {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem("languages", JSON.stringify(languages));
      return languages;
    });
}

function getTimeZones() {
  return axios
    .get(API_URL + `lookup/time-zones`)

    .then((timeZones) => {
      // store user details and token in local storage to keep user logged in between page refreshes
      localStorage.setItem("timeZones", JSON.stringify(timeZones));
      return timeZones;
    });
}

function getContacts() {
  return axios
    .get(API_URL + `lookup/contacts`)

    .then((contacts) => {
      return contacts;
    });
}

function getSalesOrderChannels() {
  return axios
    .get(API_URL + `lookup/sales-order-channels`)

    .then((contacts) => {
      return contacts;
    });
}

function getInventoryUpdateTypes() {
  return axios
    .get(API_URL + `lookup/inventory-update-types`)

    .then((contacts) => {
      return contacts;
    });
}
