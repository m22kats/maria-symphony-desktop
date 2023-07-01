exports.MariaDataResponse = class {
  constructor() {
    this.items = [];
    this.page = new exports.MariaDataPageResponse();
  }
};

exports.MariaDataPageResponse = class {
  constructor() {
    this.total = undefined;
    this.hasNext = undefined;
    this.hasPrevious = undefined;
    this.currentPage = undefined;
  }
};

exports.MariaStatusResponse = class {
  constructor() {
    this.code = undefined;
    this.message = undefined;
  }
};

exports.MariaResponse = class {
  constructor() {
    this.data = new exports.MariaDataResponse();
    this.status = new exports.MariaStatusResponse();
  }
};
