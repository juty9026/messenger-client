import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => {
    const { method, url, params } = response.config;
    const info = {
      method,
      url,
      params: JSON.stringify(params),
      status: response.status
    };
    console.info(
      Object.entries(info)
        .map(([key, value]) => `${key} ▶ ${value}`)
        .join("\n")
    );
    console.table(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
