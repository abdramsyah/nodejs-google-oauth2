"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {}
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.ENUM(["ACTIVE", "INACTIVE"]),
      role: DataTypes.ENUM(["admin", "user"]),
      full_name: DataTypes.STRING,
      phone: DataTypes.STRING,

      is_login: DataTypes.BOOLEAN,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );
  return Users;
};
