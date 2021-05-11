import * as types from "../constants";
import { salesChannelService } from "../../services/apiServices/salesChannelService";

export const salesChannelActions = {
  create,
  getSalesChannels,
  getDierectChannelsLocations,
  getSalesChannelById,
  update,
};
function create(salesChannel) {
  return (dispatch) => {
    dispatch(request({ salesChannel }));

    return salesChannelService.create(salesChannel).then(
      (salesChannel) => {
        dispatch(success(salesChannel));
        return salesChannel;
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(salesChannel) {
    return { type: types.CREATE_SALES_CHANNEL_REQUEST, salesChannel };
  }
  function success(salesChannel) {
    return { type: types.CREATE_SALES_CHANNEL_SUCCESS, salesChannel };
  }
  function failure(error) {
    return { type: types.CREATE_SALES_CHANNEL_FAILURE, error };
  }
}

function update(salesChannel, id) {
  return (dispatch) => {
    dispatch(request({ salesChannel }));

    return salesChannelService.update(salesChannel, id).then(
      (salesChannel) => {
        dispatch(success(salesChannel));
        return salesChannel;
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(salesChannel) {
    return { type: types.UPDATE_SALES_CHANNEL_REQUEST, salesChannel };
  }
  function success(salesChannel) {
    return { type: types.UPDATE_SALES_CHANNEL_SUCCESS, salesChannel };
  }
  function failure(error) {
    return { type: types.UPDATE_SALES_CHANNEL_FAILURE, error };
  }
}

function getSalesChannels() {
  return (dispatch) => {
    dispatch(request());

    return salesChannelService.getSalesChannels().then(
      (salesChannels) => dispatch(success(salesChannels)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_CHANNELS_REQUEST };
  }
  function success(salesChannels) {
    return { type: types.GET_SALES_CHANNELS_SUCCESS, salesChannels };
  }
  function failure(error) {
    return { type: types.GET_SALES_CHANNELS_FAILURE, error };
  }
}

function getDierectChannelsLocations() {
  return (dispatch) => {
    dispatch(request());

    return salesChannelService.getDierectChannelsLocations().then(
      (locations) => dispatch(success(locations)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_DIRECT_CHANNEL_LOCATIONS_REQUEST };
  }
  function success(locations) {
    return { type: types.GET_DIRECT_CHANNEL_LOCATIONS_SUCCESS, locations };
  }
  function failure(error) {
    return { type: types.GET_DIRECT_CHANNEL_LOCATIONS_FAILURE, error };
  }
}

function getSalesChannelById(id) {
  return (dispatch) => {
    dispatch(request());

    return salesChannelService.getSalesChannelById(id).then(
      (salesChannel) => dispatch(success(salesChannel)),
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: types.GET_SALES_CHANNEL_BY_ID_REQUEST };
  }
  function success(salesChannel) {
    return { type: types.GET_SALES_CHANNEL_BY_ID_SUCCESS, salesChannel };
  }
  function failure(error) {
    return { type: types.GET_SALES_CHANNEL_BY_ID_FAILURE, error };
  }
}
