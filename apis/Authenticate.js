import { responseHandler } from '../utils/apis';
import axios from 'axios';
import { BASE_URL, AUTH } from './Constants';

export const Authenticate = {
  login: async (data) => {
    try {
      const response = await axios.post(BASE_URL + AUTH.LOGIN, data);
      return responseHandler(response);
    } catch (err) {
      return responseHandler(err.response);
    }
  }
};
