import { instance } from "./base.api";

const endpoint = "character";

export const character = {
  getAll: function ({ page = 1 }: { page?: number }) {
    return instance.get(endpoint, { params: { page } });
  },
};
