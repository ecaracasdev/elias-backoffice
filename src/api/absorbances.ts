import { instance } from "./elias.api";

const endpoint = "absorbances";

export const products = {
  create: function () {
    return instance.post(endpoint);
  },
};
