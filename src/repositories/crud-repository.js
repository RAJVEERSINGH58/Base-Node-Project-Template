const { Logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
      const response = await this.model.create(data);
      return response;
  }

  async destroy(data) {
      const response = await this.model.destroy({
        where: {
          id: data
        }
      });
      if(!response){
        throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
      }
      return response;
  }

  async get(data) {
      const response = await this.model.findByPk(data);
      if(!response){
        throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
      }
      return response;
  }

  async getAll(data) {
      const response = await this.model.findAll(data);
      return response;
  }

  async update(id , data) { //data => {col: value, ...}
      const airplane = await this.model.findByPk(id);
      if(!airplane){
        throw new AppError('Not able to found the resource', StatusCodes.NOT_FOUND);
        return airplane;
      }
      const response = await this.model.update(data, {
        where: {
          id: id
        }
      });
      const updatedAirplane = await this.model.findByPk(id);
      return updatedAirplane;
  }
}

module.exports = CrudRepository;