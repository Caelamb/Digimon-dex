const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  Sequelize.define(
    "Presentacion",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      href: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
