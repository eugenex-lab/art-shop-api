class appErr extends Error {
    constructor(message, statusCode) {
        super(message, statusCode);
        // this.statusCode = statusCode;
        // this.status = "failed";
    }
}

//Err class
class AppErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = "failed";
    }
}

module.exports = { appErr, AppErr };