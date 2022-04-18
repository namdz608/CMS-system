'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeadlineComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeadlineComment.init({
    startDate:DataTypes.STRING,
    endDate: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DeadlineComment',
  });
  return DeadlineComment;
};