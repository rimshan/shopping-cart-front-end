import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.GET_SALES_CHANNELS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_CHANNELS_SUCCESS:
      return { count: action.sales_channels };

    case types.GET_SALES_CHANNELS_FAILURE:
      return {
        error: action.error,
      };

    case types.CREATE_SALES_CHANNEL_REQUEST:
      return {
        createNewItem: true,
        loading: true,
      };
    case types.CREATE_SALES_CHANNEL_SUCCESS:
      return {
        loading: false,
      };
    case types.CREATE_SALES_CHANNEL_FAILURE:
      return {
        loading: false,
      };

    case types.UPDATE_SALES_CHANNEL_REQUEST:
      return {
        //UPDATENewItem: true,
        loading: true,
      };
    case types.UPDATE_SALES_CHANNEL_SUCCESS:
      return {
        loading: false,
      };
    case types.UPDATE_SALES_CHANNEL_FAILURE:
      return {
        loading: false,
      };

    case types.GET_DIRECT_CHANNEL_LOCATIONS_REQUEST:
      return {
        loading: true,
      };
    case types.GET_DIRECT_CHANNEL_LOCATIONS_SUCCESS:
      return { count: action.locations };

    case types.GET_DIRECT_CHANNEL_LOCATIONS_FAILURE:
      return {
        error: action.error,
      };

    case types.GET_SALES_CHANNEL_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case types.GET_SALES_CHANNEL_BY_ID_SUCCESS:
      return { count: action.sales_channel };

    case types.GET_SALES_CHANNEL_BY_ID_FAILURE:
      return {
        error: action.error,
      };

    default:
      return state;
  }
}
