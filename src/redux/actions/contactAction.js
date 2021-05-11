import * as types from "../constants";
import { contactService } from "../../services/apiServices/contactService";
import { alertActions } from "./alertActions";

export const contactActions = {
  getCustomerContacts,
  getVendorContacts,
  createNewContact,
  updateContact,
  getVendorContactsWithfilters,
  getCustomerContactsWithfilters,
  getAllContacts,
};

function getCustomerContacts(pageSize, page) {
  return (dispatch) => {
    dispatch(request());

    return contactService.getCustomerContacts(pageSize, page).then(
      (contacts) => dispatch(success(contacts)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_CUSTOMER_CONTACTS_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_CUSTOMER_CONTACTS_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_CUSTOMER_CONTACTS_FAILURE, error };
  }
}

function getAllContacts() {
  return (dispatch) => {
    dispatch(request());

    return contactService.getAllContacts().then(
      (contacts) => dispatch(success(contacts)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_CONTACTS_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_CONTACTS_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_CONTACTS_FAILURE, error };
  }
}

function getVendorContacts(pageSize, page) {
  return (dispatch) => {
    dispatch(request());

    return contactService.getVendorContacts(pageSize, page).then(
      (contacts) => dispatch(success(contacts)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_VENDOR_CONTACTS_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_VENDOR_CONTACTS_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_VENDOR_CONTACTS_FAILURE, error };
  }
}

function getVendorContactsWithfilters(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return contactService
      .getVendorContactsWithFilters(pageSize, page, filter)
      .then(
        (contacts) => dispatch(success(contacts)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_VENDOR_CONTACTS_WITH_FILTERS_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_VENDOR_CONTACTS_WITH_FILTERS_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_VENDOR_CONTACTS_WITH_FILTERS_FAILURE, error };
  }
}

function getCustomerContactsWithfilters(pageSize, page, filter) {
  return (dispatch) => {
    dispatch(request());

    return contactService
      .getCustomerContactsWithFilters(pageSize, page, filter)
      .then(
        (contacts) => dispatch(success(contacts)),
        (error) => dispatch(failure(error))
      );
  };

  function request() {
    return { type: types.GET_CUSTOMER_CONTACTS_WITH_FILTERS_REQUEST };
  }
  function success(contacts) {
    return { type: types.GET_CUSTOMER_CONTACTS_WITH_FILTERS_SUCCESS, contacts };
  }
  function failure(error) {
    return { type: types.GET_CUSTOMER_CONTACTS_WITH_FILTERS_FAILURE, error };
  }
}

function createNewContact(contact) {
  return (dispatch) => {
    dispatch(request());

    return contactService.createNewContact(contact).then(
      (contact) => dispatch(success(contact)),
      (error) => dispatch(failure(error))
    );
  };

  function request(contact) {
    return { type: types.CREATE_NEW_CONTACT_REQUEST, contact };
  }
  function success(contact) {
    return { type: types.CREATE_NEW_CONTACT_SUCCESS, contact };
  }
  function failure(error) {
    return { type: types.CREATE_NEW_CONTACT_FAILURE, error };
  }
}

function updateContact(contact, id) {
  return (dispatch) => {
    dispatch(request({ contact }));

    return contactService.updateContact(contact, id).then(
      (contact) => {
        dispatch(success(contact));
        return contact;
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(contact) {
    return { type: types.UPDATE_CONTACT_REQUEST, contact };
  }
  function success(contact) {
    return { type: types.UPDATE_CONTACT_SUCCESS, contact };
  }
  function failure(error) {
    return { type: types.UPDATE_CONTACT_FAILURE, error };
  }
}
