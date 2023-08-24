const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Digimon",
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
      xAntibody: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      releaseDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.JSON), // Un array de objetos JSON
        allowNull: false,
      },
      descriptions: {
        type: DataTypes.ARRAY(DataTypes.JSONB), // Puedes usar JSONB para almacenar objetos JSON
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
