const { StatusCodes } = require('http-status-codes')

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequestCity(req , res , next){
  if(!req.body.name){
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError([' city name is empty'],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next(); 
}

module.exports = {
  validateCreateRequestCity
}