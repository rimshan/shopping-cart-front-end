import axios from "axios";

export const salesChannelService = {
  getSalesChannels,
  create,
  getDierectChannelsLocations,
  getSalesChannelById,
  update,
};

const API_URL = process.env.REACT_APP_API_URL;

function getSalesChannels() {
  return axios({
    method: "get",
    url: API_URL + `salesChannels`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function create(salesChannel) {
  return axios({
    method: "post",
    url: API_URL + `salesChannel`,
    data: salesChannel,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function update(salesChannel, id) {
  return axios({
    method: "put",
    url: API_URL + `salesChannel/${id}`,
    data: salesChannel,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getDierectChannelsLocations() {
  return axios({
    method: "get",
    url: API_URL + `directChannelLocations`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}

function getSalesChannelById(id) {
  return axios({
    method: "get",
    url: API_URL + `salesChannel/${id}`,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
}
