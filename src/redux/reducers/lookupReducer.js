import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_COUNTRIES_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_COUNTRIES_LOOKUP_SUCCESS:
      return { countries: action.countries, loading: false };

    case types.GET_COUNTRIES_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case types.GET_UNITS_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_UNITS_LOOKUP_SUCCESS:
      return { units: action.units, loading: false };

    case types.GET_UNITS_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };
    case types.GET_INDUSTRIES_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INDUSTRIES_LOOKUP_SUCCESS:
      return { industries: action.industries, loading: false };

    case types.GET_INDUSTRIES_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_DATE_FORMATS_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_DATE_FORMATS_LOOKUP_SUCCESS:
      return { date_formats: action.date_formats, loading: false };

    case types.GET_DATE_FORMATS_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_FISCAL_YEARS_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_FISCAL_YEARS_LOOKUP_SUCCESS:
      return { fiscal_years: action.fiscal_years, loading: false };

    case types.GET_FISCAL_YEARS_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_LANGUAGES_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_LANGUAGES_LOOKUP_SUCCESS:
      return { languages: action.languages, loading: false };

    case types.GET_LANGUAGES_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_TIME_ZONES_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_TIME_ZONES_LOOKUP_SUCCESS:
      return { time_zones: action.time_zones, loading: false };

    case types.GET_TIME_ZONES_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_CONTACTS_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_CONTACTS_LOOKUP_SUCCESS:
      return { contacts: action.contacts, loading: false };

    case types.GET_CONTACTS_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_SALES_ORDER_CHANNELS_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_ORDER_CHANNELS_LOOKUP_SUCCESS:
      return { channels: action.channels, loading: false };

    case types.GET_SALES_ORDER_CHANNELS_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_REQUEST:
      return {
        loading: true,
      };
    case types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_SUCCESS:
      return { channels: action.update_types, loading: false };

    case types.GET_INVENTORY_UPDATE_TYPES_LOOKUP_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
