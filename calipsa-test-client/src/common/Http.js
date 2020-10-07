import axios from 'axios';
import Constants from './Constants';
import Utility from '@/common/Utility'

let baseHTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': Constants.CONTENT_TYPE,
    'Authorization': "Bearer " + Utility.getToken('token'),
  }
});

export const HTTP = baseHTTP;
