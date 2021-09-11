import Axios from "axios";

export const responseHandler = (response) => {
  if (response) {
    const { status, data } = response;
    if (status >= 200 && status <= 299) {
      return {
        ...data,
        success: true
      };
    } else {
      return {
        ...data,
        success: false
      };
    }
  } else {
    return {
      message: 'No Network',
      success: false
    }
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
