import Axios from "axios";

export const responseHandler = (response) => {
  try {
    if (response) {
      response = JSON.parse(JSON.stringify(response))
      if (response && response.status && response.data) {
        const { status, data } = response;
        if (status >= 200 && status <= 299) {
          return { ...data, success: true };
        } else {
          return { ...data, success: false };
        }
      } else {
        return { data: response, success: false, message: 'Success', status: 200 }
      }
    } else {
      return { message: 'No Network', success: true, status: 500 }
    }
  } catch (error) {
    return { data: error, message: 'Failure', success: false, status: 400 };
  }
}

export const GLOBAL = 'aplication_global';

export function setupGlobal() {
  let gl = {};
  global[GLOBAL] = gl;
  return gl;
}
export function getGlobal() {
  return global[GLOBAL];
}

export const initAxiosHeaders = async (headers, logout) => {

  getGlobal().requestInterceptor = Axios.interceptors.request.use((config) => {
    config.headers = { ...config.headers, ...headers };
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  getGlobal().responseInterceptor = Axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response.status === 401) {
      return logout();
    }
    return error;
  })

}

export const resetInterceptor = () => {
  if (getGlobal().requestInterceptor !== undefined) {
    for (let i = 0; i <= getGlobal().requestInterceptor; i++) {
      Axios.interceptors.request.eject(i);
    }
  }
  if (getGlobal().responseInterceptor !== undefined) {
    for (let i = 0; i <= getGlobal().responseInterceptor; i++) {
      Axios.interceptors.response.eject(i);
    }
  }
}
