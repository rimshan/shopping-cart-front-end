import * as types from "../constants";
import { lookupService } from "../../services/apiServices/lookupService";

export const lookupActions = {
  getCountries,
  getProductTypes,
  getIndustries,
  getDateFormats,
  getFiscalYears,
  getLanguages,
  getTimeZones,
  getContacts,
  getSalesOrderChannels,
  getInventoryUpdateTypes,
};

function getCountries() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getCountries().then(
      (countries) => dispatch(success(countries)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_COUNTRIES_LOOKUP_REQUEST };
  }
  function success(countries) {
    return { type: types.GET_COUNTRIES_LOOKUP_SUCCESS, countries };
  }
  function failure(error) {
    return { type: types.GET_COUNTRIES_LOOKUP_FAILURE, error };
  }
}

function getProductTypes() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getProductTypes().then(
      (productTypes) => dispatch(success(productTypes)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_UNITS_LOOKUP_REQUEST };
  }
  function success(productTypes) {
    return { type: types.GET_UNITS_LOOKUP_SUCCESS, productTypes };
  }
  function failure(error) {
    return { type: types.GET_UNITS_LOOKUP_FAILURE, error };
  }
}

function getIndustries() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getIndustries().then(
      (industries) => dispatch(success(industries)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_INDUSTRIES_LOOKUP_REQUEST };
  }
  function success(industries) {
    return { type: types.GET_INDUSTRIES_LOOKUP_SUCCESS, industries };
  }
  function failure(error) {
    return { type: types.GET_INDUSTRIES_LOOKUP_FAILURE, error };
  }
}

function getDateFormats() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getDateFormats().then(
      (date_formats) => dispatch(success(date_formats)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_DATE_FORMATS_LOOKUP_REQUEST };
  }
  function success(date_formats) {
    return { type: types.GET_DATE_FORMATS_LOOKUP_SUCCESS, date_formats };
  }
  function failure(error) {
    return { type: types.GET_DATE_FORMATS_LOOKUP_FAILURE, error };
  }
}

function getFiscalYears() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getFiscalYears().then(
      (fiscal_years) => dispatch(success(fiscal_years)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_FISCAL_YEARS_LOOKUP_REQUEST };
  }
  function success(fiscal_years) {
    return { type: types.GET_FISCAL_YEARS_LOOKUP_SUCCESS, fiscal_years };
  }
  function failure(error) {
    return { type: types.GET_FISCAL_YEARS_LOOKUP_FAILURE, error };
  }
}

function getLanguages() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getLanguages().then(
      (languages) => dispatch(success(languages)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_LANGUAGES_LOOKUP_REQUEST };
  }
  function success(languages) {
    return { type: types.GET_LANGUAGES_LOOKUP_SUCCESS, languages };
  }
  function failure(error) {
    return { type: types.GET_LANGUAGES_LOOKUP_FAILURE, error };
  }
}

function getTimeZones() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getTimeZones().then(
      (time_zones) => dispatch(success(time_zones)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_TIME_ZONES_LOOKUP_REQUEST };
  }
  function success(time_zones) {
    return { type: types.GET_TIME_ZONES_LOOKUP_SUCCESS, time_zones };
  }
  function failure(error) {
    return { type: types.GET_TIME_ZONES_LOOKUP_FAILURE, error };
  }
}

function getContacts() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getContacts().then(
      (contacts) => dispatch(success(contacts)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_CONTACTS_LOOKUP_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_CONTACTS_LOOKUP_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_CONTACTS_LOOKUP_FAILURE, error };
  }
}

function getSalesOrderChannels() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getSalesOrderChannels().then(
      (channels) => dispatch(success(channels)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_ORDER_CHANNELS_LOOKUP_REQUEST };
  }
  function success(channels) {
    return { type: types.GET_SALES_ORDER_CHANNELS_LOOKUP_SUCCESS, channels };
  }
  function failure(error) {
    return { type: types.GET_SALES_ORDER_CHANNELS_LOOKUP_FAILURE, error };
  }
}

function getInventoryUpdateTypes() {
  return (dispatch) => {
    dispatch(request());

    return lookupService.getInventoryUpdateTypes().then(
      (update_types) => dispatch(success(update_types)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_REQUEST };
  }
  function success(update_types) {
    return {
      type: types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_SUCCESS,
      update_types,
    };
  }
  function failure(error) {
    return { type: types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_FAILURE, error };
  }
}
