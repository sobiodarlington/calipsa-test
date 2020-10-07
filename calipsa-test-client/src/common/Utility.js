import Constants from './Constants';

const Utility = {
  isEmpty(obj) {
    for (const [, value] in Object.entries(obj)) {
      if (value) return false;
    }

    return true;
  },
  getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  },
  getToken(name) {
    return localStorage.getItem(name);
  },
  deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  redirectToAuthPage() {
    window.location.href = Constants.LOGIN_URL;
  },
};

export default Utility;
