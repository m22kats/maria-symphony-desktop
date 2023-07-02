const storage = {
  // Storage data object
  data: {},

  // Synchronous setItem method
  setItemSync: function (key, value) {
    this.data[key] = value;
  },

  // Other storage properties and methods...
};

module.exports = storage;
