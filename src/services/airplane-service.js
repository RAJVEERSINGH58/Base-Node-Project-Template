const { StatusCodes, BAD_REQUEST } = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if(error.name == 'SequelizeValidationError'){
      let explanation = [];
      error.errors.forEach((err) =>{
        explanation.push(err.message);
      });
      throw new AppError(explanation , BAD_REQUEST);
    }
    throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError('Cannot fetch data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAirplane(id){
  try {
    const airplanes = await airplaneRepository.get(id);
    return airplanes;
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Airplane not found', error.statusCode);
    }
    throw new AppError('Cannot fetch data of airplane', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirplane(id){
  try {
    const response =  await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('the Airplane you requested to delete is not found', error.statusCode);
    }
    throw new AppError('Cannot destroy a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
}