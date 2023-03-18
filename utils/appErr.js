//App Errpr
const appErr = (message, statusCode) => {

    const err = new Error(message);
    err.statusCode = statusCode;

    return err;
}


class AppErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { appErr, AppErr };