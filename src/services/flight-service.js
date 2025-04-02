const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers');

const flightRepository = new FlightRepository();

async function createFlight(data){
  try {
    const validateTime = compareTime(data.arrivalTime, data.departureTime);
    if(!validateTime){
      throw new AppError('Departure time should be before arrival time', StatusCodes.BAD_REQUEST);
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {

    if (error instanceof AppError) {
      throw error;
    }

    if(error.name == 'SequelizeValidationError'){
      let explanation = [];
      error.errors.forEach((err) =>{
        explanation.push(err.message);
      });
      throw new AppError(explanation , BAD_REQUEST);
    }
    throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllFlights(query){
  let customFilter = {};
  let sortFilter = [];

  if(query.trips){
    [departureAirportId, arrivalAirportId] = query.trips.split('-');
    customFilter.departureAirportId = departureAirportId; 
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  if(query.price){
    [minPrice, maxPrice] = query.price.split('-');
    customFilter.price = {
      [Op.between]: [minPrice,((maxPrice == undefined) ? 200000 : maxPrice)]
    }
  }

  if(query.travellers){
    customFilter.totalSeats = {
      [Op.gte]: query.travellers
    }
  }

  if (query.tripDate) {
    const startOfDay = new Date(query.tripDate + "T00:00:00.000Z"); // Start of day in UTC
    const endOfDay = new Date(query.tripDate + "T23:59:59.999Z");   // End of day in UTC
  
    customFilter.departureTime = {
      [Op.between]: [startOfDay, endOfDay]
    };
  }

  if(query.sort){
      const params = query.sort.split(',');
      const sortFilters = params.map((param) => param.split('_'));
      sortFilter = sortFilters;
  }

  try {
    const flight = await flightRepository.getAllFlights(customFilter , sortFilter);
    return flight;
  } catch (error) {
    console.log(error);
      throw new AppError('Cannot fetch data of all flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('flight not found', error.statusCode);
    }
    throw new AppError('Cannot fetch data of flight', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
}