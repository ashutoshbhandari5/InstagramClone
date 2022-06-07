module.exports = (handler) => {
    return async(req, res, next) => {
        handler(req, res, next).catch(error => next(error));
    }
}