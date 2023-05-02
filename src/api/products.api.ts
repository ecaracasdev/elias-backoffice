import { instance } from "./elias.api";

const endpoint = "products";

export const products = {
  getAll: function () {
    return instance.get(endpoint);
  },
};
