const { StatusCodes, BAD_REQUEST } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
      let explanation = [];
      error.errors.forEach((err) =>{
        explanation.push(err.message);
      });
      throw new AppError(explanation , BAD_REQUEST);
    }
    throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


async function destroyCity(id){
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('the City you requested to delete is not found', error.statusCode);
    }
    throw new AppError('Cannot destroy a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(id, data) {
  try {
    // ✅ Step 1: Input Validation
    if (!data || !data.name || data.name.trim() === "") {
      throw new AppError("City name is required", StatusCodes.BAD_REQUEST);
    }

    // ✅ Step 2: Perform the Update
    const updatedRows = await cityRepository.update(id, data);

    // ✅ Step 3: Check if Any Rows Were Updated
    if (updatedRows === 0) {  
      throw new AppError("The city you requested to update is not found", StatusCodes.NOT_FOUND);
    }

    // ✅ Step 4: Fetch the Updated City Data
    const updatedCity = await cityRepository.get(id);

    // ✅ Step 5: Return the Updated City
    return updatedCity;

  } catch (error) {
    // ✅ Step 6: Error Handling - Preserve the Original Error Message
    throw new AppError(
      error.statusCode === StatusCodes.NOT_FOUND
        ? "The city you requested to update is not found"
        : error.message || "Cannot update the City object",
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}



module.exports = {
  createCity,
  destroyCity,
  updateCity,
}