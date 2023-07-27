const { errorMessages } = require('./error'); 

const tokenError = (req, res, error) => {
  let response = {
    status: 404,
    error: error
  };

  return res.send(response);
};

const clientError = (req, res, error) => {
  let response = {
    status: 400,
    error: error
  };

  return res.send(response);
};

const serverError = (req, res, error) => {

  let response = {
    status: 500,
    error: error
  };

  return res.send(response);
};

const reply = (req, res, data) => {

  let response = {
    status: 200,
    result: data
  }
  return res.send(response);
};

const replyMsg = (req, res, data, message) => {
  let response = {
    status: 200,
    data: data,
    message: message
  }

  return res.send(response);
};

const nodata = (req, res, data) => {

  let response = {
    status: 409,
    result: data
  }
  return res.status(409).send(response)
}

const duplicatedata = (req, res, data) => {

  let response = {
    status: 403,
    result: data
  }
  return res.status(409).send(response)
}

const clientErrorMsg = (req, res, message) => {
  let response = {
    status: 400,
    message: message
  };

  return res.send(response);
};


const dbErrorMsg = (req, res, message) => {
  let response = {
    status: 403,
    message: message
  };

  return res.send(response);
};

const faild = (req, res, data) => {

  let response = {
    status: 403,
    result: data
  }
  return res.send(response);
};


module.exports = {
  clientError,
  serverError,
  reply,
  replyMsg,
  nodata,
  duplicatedata,
  clientErrorMsg,
  tokenError,
  dbErrorMsg,
  faild
}
