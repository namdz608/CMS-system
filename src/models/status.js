'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Status.belongsTo(models.User,{foreignKey:'userId'})
      Status.belongsTo(models.Category,{foreignKey:'categoryId'})
      Status.hasOne(models.Reaction,{foreignKey:'statusId'})
      Status.hasMany(models.Comment,{foreignKey:'statusId'})

    }
  }
  Status.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    contentMarkdown: DataTypes.TEXT('long'),
    contentHtml: DataTypes.TEXT('long'),
    files:DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};