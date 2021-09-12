import { responseHandler } from '../utils/apis';
import axios from 'axios';
import { BASE_URL, BLOGS } from './Constants';

export const Blogs = {
  getBlogs: async () => {
    try {
      const response = await axios.get(`${BASE_URL}${BLOGS.GET}`);
      return responseHandler(response);
    } catch (err) {
      return responseHandler(err.response ? err.response : err );
    }
  }
};
