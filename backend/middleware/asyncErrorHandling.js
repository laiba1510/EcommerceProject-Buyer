const ErrorHandle = require("../utils/errorHandle");

module.exports = (ErrorHandle) => (req, res, next) => {
    Promise.resolve(ErrorHandle(req, res, next)).catch(next);
  };
  