
export default {
  store(key, value) {
    localStorage.setItem(key, value);

    return true;
  },

  retrieve(key) {
    return localStorage.getItem(key);
  },

  delete(key) {
    return localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
