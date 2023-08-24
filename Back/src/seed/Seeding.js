const axios = require("axios");
const {
  Presentacion,
  Digimon,
  Level,
  Type,
  Fields,
  Attributes,
  Skills,
  PriorE,
  NextE,
} = require("../db");
const API_URL = "http://www.digi-api.com/api/v1/digimon";

const DigimonIds = async (digimonId) => {
  try {
    const RESPONSE = await axios.get(`${API_URL}/${digimonId}`);
    const BREED = RESPONSE.data;
    const DIGIMON_DATA = {
      id: BREED.id,
      name: BREED.name,
      xAntibody: BREED.xAntibody,
      releaseDate: BREED.releaseDate,
      images: BREED.images,
      descriptions: BREED.descriptions,
    };

    console.log(DIGIMON_DATA);

    await Digimon.bulkCreate(DIGIMON_DATA);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const seedDatabase = async () => {
  try {
    const RESPONSE = await axios.get(API_URL);
    const BREEDS = RESPONSE.data;
    const DIGIMON_DATA = BREEDS.content.map((breeds) => {
      return {
        id: breeds.id,
        name: breeds.name,
        href: breeds.href,
        image: breeds.image,
      };
    });

    await DigimonIds(1);

    await Presentacion.bulkCreate(DIGIMON_DATA);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = { seedDatabase };
