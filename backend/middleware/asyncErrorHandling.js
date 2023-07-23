module.exports = (handleErr) => (req, res, next) => {
    Promise.resolve(handleErr(req, res, next)).catch(next);
  };
  