const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Skills",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      skill: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
