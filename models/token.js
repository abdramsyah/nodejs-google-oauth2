"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {}
  }
  Token.init(
    {
      token: DataTypes.TEXT,
      expired: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
