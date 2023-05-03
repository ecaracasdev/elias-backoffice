import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("http://13.59.179.196:1337/api/sessions", {
    email,
    password,
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await axios.delete("http://13.59.179.196:1337/api/sessions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
