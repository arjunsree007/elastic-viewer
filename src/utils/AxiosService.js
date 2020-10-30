import Axios from "axios";

/* Service layer class for all API related calls */

export const getAllMappings = async config => {
  return await Axios.request(config).then(function(response) {
    return Promise.resolve(response.data);
  });
};
