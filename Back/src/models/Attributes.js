const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Attributes",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      attribute: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
