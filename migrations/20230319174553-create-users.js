"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(["admin", "user"]),
        defaultValue: "user",
      },
      status: {
        type: Sequelize.ENUM(["ACTIVE", "INACTIVE"]),
        defaultValue: "INACTIVE",
      },

      full_name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      is_login: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("Users", ["email"]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Users");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_role";'
    );
    // await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_marital_status";');
    // await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_blood_type";');
  },
};
