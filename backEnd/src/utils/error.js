const getErrorStack = (error) => {
    let debugMode = (process.env.DEBUG_MODE) || 'OFF';
    let errorStack;
    if (debugMode !== undefined && debugMode === 'ON') {
        errorStack = error.message;
    } else {
        errorStack = 'Internal Server Error'
    }
    return errorStack;
}

let errorMessages = {
    internal: 'Internal server error',
    recordExist: 'Record already exist'
};

module.exports = {
    getErrorStack,
    errorMessages
};