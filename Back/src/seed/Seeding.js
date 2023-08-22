const axios = require("axios");
const {
  Digimon,
  Level,
  Type,
  Fields,
  Attributes,
  Skills,
  PriorE,
  NextE,
} = require("../db");
const API_URL = "digi-api.com/api/v1/digimon";

const seedDatabase = async () => {
  try {
    const RESPONSE = await axios.get(API_URL);
    const BREEDS = RESPONSE.data;
    const DIGIMON_DATA = BREEDS.map((breed) => {
      return {
        id: breed.id,
        name: breed.name,
        xAntibody: breed.xAntibody,
        releaseDate: breed.releaseDate,
        images: breed.images,
        descriptions: breed.descriptions,
      };
    });

    await Digimon.bulkCreate(DIGIMON_DATA, { ignoreDuplicates: true });
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = { seedDatabase };
