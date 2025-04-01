'use strict';
const {
  Model
} = require('sequelize');

const { Enums } = require('../utils/common');
const { BUISNESS , PREMIUM_ECONOMY , FIRST_CLASS , ECONOMY } = Enums.SEAT_TYPE
module.exports = (sequelize, DataTypes) => {
  class Seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
      });
    }
  }
  Seats.init({
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [BUISNESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY],
      defaultValue: ECONOMY,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Seats',
  });
  return Seats;
};