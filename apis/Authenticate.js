import { responseHandler } from '../utils/apis';
import axios from 'axios';
import { BASE_URL, AUTH } from './Constants';

export const Authenticate = {
  login: async (email, password) => {
    try {
      const response = await axios.post(BASE_URL + AUTH.LOGIN, { email, password });
      return responseHandler(response);
    } catch (err) {
      return responseHandler(err.response);
    }
  }
};
