export default {
  BASE_URL: process.env.VUE_APP_BASE_URL,
  LOGIN_URL: process.env.VUE_APP_LOGIN_URL,
  PERSISTENT_STORE_NS: 'calipsa.test',
  CONTENT_TYPE: 'application/json;charset=UTF-8',
  RESPONSE_201_ERROR: '[201] We could not complete your request at the moment',
  RESPONSE_200_ERROR: '[200] We could not complete your request at the moment',
  RESPONSE_ERROR: 'We could not complete your request at the moment, Please try again later.',
  REGISTRATION_SUCCESSFUL: 'Your account has been created. Please check your inbox for an activation email.',
  LOGIN_SUCCESSFUL: 'Welcome back dear!',
  SESSION_EXPIRE: 'Your session has expired, please login again.',
  NETWORK_ERROR: 'Connection Lost, please check your internet connection and try again.',
}
