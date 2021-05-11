import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_ORGANIZATION_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ORGANIZATION_SUCCESS:
      return action.organization;

    case types.GET_ORGANIZATION_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_ORGANIZATION_LOCATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ORGANIZATION_LOCATIONS_SUCCESS:
      return action.locations;

    case types.GET_ORGANIZATION_LOCATIONS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ALL_ORGANIZATION_LOCATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ALL_ORGANIZATION_LOCATIONS_SUCCESS:
      return action.locations;

    case types.GET_ALL_ORGANIZATION_LOCATIONS_FAILURE:
      return {
        error: action.error,
      };
    case types.GET_ORGANIZATION_TAXES_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ORGANIZATION_TAXES_SUCCESS:
      return action.taxes;

    case types.GET_ORGANIZATION_TAXES_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_ORGANIZATION_TAXES_REQUEST:
      return {
        loading: true,
      };
    case types.CREATE_ORGANIZATION_TAXES_SUCCESS:
      return {
        loading: false,
      };

    case types.CREATE_ORGANIZATION_TAXES_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_ORGANIZATION_LOCATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.CREATE_ORGANIZATION_LOCATIONS_SUCCESS:
      return {
        loading: false,
      };

    case types.CREATE_ORGANIZATION_LOCATIONS_FAILURE:
      return {
        error: action.error,
      };
    case types.UPDATE_ORGANIZATION_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ORGANIZATION_SUCCESS:
      return {};

    case types.UPDATE_ORGANIZATION_FAILURE:
      return {
        error: action.error,
      };

    case types.UPDATE_ORGANIZATION_LOCATION_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ORGANIZATION_LOCATION_SUCCESS:
      return {};

    case types.UPDATE_ORGANIZATION_LOCATION_FAILURE:
      return {
        error: action.error,
      };

    case types.UPDATE_ORGANIZATION_TAX_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ORGANIZATION_TAX_SUCCESS:
      return {};

    case types.UPDATE_ORGANIZATION_TAX_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_ORGANIZATION_NOTIFICATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_ORGANIZATION_NOTIFICATIONS_SUCCESS:
      return action.notifications;

    case types.GET_ORGANIZATION_NOTIFICATIONS_FAILURE:
      return {
        error: action.error,
      };

    case types.UPDATE_ORGANIZATION_NOTIFICATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.UPDATE_ORGANIZATION_NOTIFICATIONS_SUCCESS:
      return {};

    case types.UPDATE_ORGANIZATION_NOTIFICATIONS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
