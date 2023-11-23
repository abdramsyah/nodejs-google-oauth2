"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {}
  }
  Products.init(
    {
      product_name: DataTypes.STRING,
      image: DataTypes.STRING,
      base_price: DataTypes.FLOAT,
      status: DataTypes.STRING,

      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "Products",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return Products;
};
