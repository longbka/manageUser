import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:3031",
});
instance.defaults.withCredentials = true;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Authentication (token related issues)")
        return Promise.reject(error);
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("Forbidden (permission related issues)")
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        toast.error("Bad request")
        return Promise.reject(error);
      }

      // not found
      case 404: {
        toast.error("Not found")
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        toast.error("Conflict")
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        toast.error("Unprocessable")
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        toast.error("Generic api error (server related) unexpected")
        return Promise.reject(error);
      }
    }
  }
);
export default instance;
