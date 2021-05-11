import * as types from "../constants";
import { organizationService } from "../../services/apiServices/organizationService";

export const organizationActions = {
  getOrganization,
  getOrganizationLocations,
  updateOrganization,
  getOrganizationTaxes,
  createOrganizationTaxes,
  createOrganizationLocations,
  updateOrganizationLocation,
  updateOrganizationTax,
  getOrganizationNotifications,
  updateOrganizationNotification,
  getAllOrganizationLocations,
};

function getOrganization(id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService.getOrganization(id).then(
      (organization) => dispatch(success(organization)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ORGANIZATION_REQUEST };
  }
  function success(organization) {
    return { type: types.GET_ORGANIZATION_SUCCESS, organization };
  }
  function failure(error) {
    return { type: types.GET_ORGANIZATION_FAILURE, error };
  }
}

function getOrganizationLocations() {
  return (dispatch) => {
    dispatch(request());

    return organizationService.getOrganizationLocations().then(
      (locations) => dispatch(success(locations)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ORGANIZATION_LOCATIONS_REQUEST };
  }
  function success(locations) {
    return { type: types.GET_ORGANIZATION_LOCATIONS_SUCCESS, locations };
  }
  function failure(error) {
    return { type: types.GET_ORGANIZATION_LOCATIONS_FAILURE, error };
  }
}

function getAllOrganizationLocations() {
  return (dispatch) => {
    dispatch(request());

    return organizationService.getAllOrganizationLocations().then(
      (locations) => dispatch(success(locations)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ALL_ORGANIZATION_LOCATIONS_REQUEST };
  }
  function success(locations) {
    return { type: types.GET_ALL_ORGANIZATION_LOCATIONS_SUCCESS, locations };
  }
  function failure(error) {
    return { type: types.GET_ALL_ORGANIZATION_LOCATIONS_FAILURE, error };
  }
}

function getOrganizationTaxes() {
  return (dispatch) => {
    dispatch(request());

    return organizationService.getOrganizationTaxes().then(
      (taxes) => dispatch(success(taxes)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_ORGANIZATION_TAXES_REQUEST };
  }
  function success(taxes) {
    return { type: types.GET_ORGANIZATION_TAXES_SUCCESS, taxes };
  }
  function failure(error) {
    return { type: types.GET_ORGANIZATION_TAXES_FAILURE, error };
  }
}

function createOrganizationTaxes(tax, organization_id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService
      .createOrganizationTaxes(tax, organization_id)
      .then(
        (taxes) => dispatch(success(taxes)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.CREATE_ORGANIZATION_TAXES_REQUEST };
  }
  function success(taxes) {
    return { type: types.CREATE_ORGANIZATION_TAXES_SUCCESS, taxes };
  }
  function failure(error) {
    return { type: types.CREATE_ORGANIZATION_TAXES_FAILURE, error };
  }
}

function createOrganizationLocations(location) {
  return (dispatch) => {
    dispatch(request());

    return organizationService.createOrganizationLocations(location).then(
      (taxes) => dispatch(success(taxes)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.CREATE_ORGANIZATION_LOCATIONS_REQUEST };
  }
  function success(location) {
    return { type: types.CREATE_ORGANIZATION_LOCATIONS_SUCCESS, location };
  }
  function failure(error) {
    return { type: types.CREATE_ORGANIZATION_LOCATIONS_FAILURE, error };
  }
}

function updateOrganization(organization, id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService.updateOrganization(organization, id).then(
      (organization) => dispatch(success(organization)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_REQUEST };
  }
  function success(organization) {
    return { type: types.UPDATE_ORGANIZATION_SUCCESS, organization };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_FAILURE, error };
  }
}

function updateOrganizationLocation(location, id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService.updateOrganizationLocation(location, id).then(
      (location) => dispatch(success(location)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_LOCATION_REQUEST };
  }
  function success(location) {
    return { type: types.UPDATE_ORGANIZATION_LOCATION_SUCCESS, location };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_LOCATION_FAILURE, error };
  }
}

function updateOrganizationTax(tax, id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService.updateOrganizationTax(tax, id).then(
      (tax) => dispatch(success(tax)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_TAX_REQUEST };
  }
  function success(tax) {
    return { type: types.UPDATE_ORGANIZATION_TAX_SUCCESS, tax };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_TAX_FAILURE, error };
  }
}

function getOrganizationNotifications(organization_id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService
      .getOrganizationNotification(organization_id)
      .then(
        (notifications) => dispatch(success(notifications)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_ORGANIZATION_NOTIFICATIONS_REQUEST };
  }
  function success(notifications) {
    return {
      type: types.GET_ORGANIZATION_NOTIFICATIONS_SUCCESS,
      notifications,
    };
  }
  function failure(error) {
    return { type: types.GET_ORGANIZATION_NOTIFICATIONS_FAILURE, error };
  }
}

function updateOrganizationNotification(notification, id) {
  return (dispatch) => {
    dispatch(request());

    return organizationService
      .updateOrganizationNotification(notification, id)
      .then(
        (notification) => dispatch(success(notification)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.UPDATE_ORGANIZATION_NOTIFICATIONS_REQUEST };
  }
  function success(notification) {
    return {
      type: types.UPDATE_ORGANIZATION_NOTIFICATIONS_SUCCESS,
      notification,
    };
  }
  function failure(error) {
    return { type: types.UPDATE_ORGANIZATION_NOTIFICATIONS_FAILURE, error };
  }
}
