const ErrorHandle = require("../utils/BackendErrorHandle");

module.exports = (ErrorHandle) => (req, res, next) => {
    Promise.resolve(ErrorHandle(req, res, next)).catch(next);
  };
  