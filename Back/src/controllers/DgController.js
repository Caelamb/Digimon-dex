const { Presentacion, Digimon } = require("../db");
const { Op } = require("sequelize");

const getAllDigimon = async () => {
  try {
    const digimon = await Presentacion.findAll();
    return digimon;
  } catch (error) {
    console.error(err);
    throw new Error("Error in the server");
  }
};

module.exports = {
  getAllDigimon,
};
