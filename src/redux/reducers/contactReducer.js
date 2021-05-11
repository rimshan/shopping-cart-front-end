import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_CONTACTS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_CONTACTS_SUCCESS:
      return { contacts: action.contacts, loading: false };

    case types.GET_CONTACTS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_CUSTOMER_CONTACTS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_CUSTOMER_CONTACTS_SUCCESS:
      return { customer_contacts: action.contacts, loading: false };

    case types.GET_CUSTOMER_CONTACTS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_VENDOR_CONTACTS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_VENDOR_CONTACTS_SUCCESS:
      return { vendor_contacts: action.contacts, loading: false };

    case types.GET_VENDOR_CONTACTS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.GET_VENDOR_CONTACTS_WITH_FILTERS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_VENDOR_CONTACTS_WITH_FILTERS_SUCCESS:
      return { vendor_contacts: action.contacts, loading: false };

    case types.GET_VENDOR_CONTACTS_WITH_FILTERS_FAILURE:
      return {
        error: action.error,
        loading: false,
      };

    case types.CREATE_NEW_CONTACT_REQUEST:
      return {
        createNewContact: true,
        loading: true,
      };
    case types.CREATE_NEW_CONTACT_SUCCESS:
      return action.contact;
    case types.CREATE_NEW_CONTACT_FAILURE:
      return {
        error: action.error,
      };
    case types.UPDATE_CONTACT_REQUEST:
      return {
        createNewContact: true,
        loading: true,
      };
    case types.UPDATE_CONTACT_SUCCESS:
      return {
        loading: false,
      };
    case types.UPDATE_CONTACT_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
