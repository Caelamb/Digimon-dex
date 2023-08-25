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

const getDigimonIds = async () => {
  try {
    const PAGE_SIZe = 1422;
    const RESPONSE = await axios.get(`${API_URL}?pageSize=${PAGE_SIZe}`);
    const BREEDS = RESPONSE.data.content;
    const digimonIds = BREEDS.map((breeds) => breeds.id);
    return digimonIds;
  } catch (error) {
    console.error("Error getting Digimon IDs:", error);
  }
};

const DigimonIds = async (digimonId) => {
  try {
    const RESPONSE = await axios.get(`${API_URL}/${digimonId}`);
    const BREED = RESPONSE.data;
    const DIGIMON_ID = {
      id: BREED.id,
      name: BREED.name,
      xAntibody: BREED.xAntibody,
      releaseDate: BREED.releaseDate,
      images: BREED.images,
      descriptions: BREED.descriptions,
    };

    await Digimon.create(DIGIMON_ID);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

const seedDatabase = async () => {
  try {
    const PAGE_SIZE = 1422;
    const RESPONSE = await axios.get(`${API_URL}?pageSize=${PAGE_SIZE}`);
    const BREEDS = RESPONSE.data.content;
    const DIGIMON_DATA = BREEDS.map((breeds) => {
      return {
        id: breeds.id,
        name: breeds.name,
        href: breeds.href,
        image: breeds.image,
      };
    });
    await Presentacion.bulkCreate(DIGIMON_DATA, { ignoreDuplicates: true });

    const digimonIds = await getDigimonIds();

    for (const digimonId of digimonIds) {
      await DigimonIds(digimonId);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = { seedDatabase };

// for (const digimon of DIGIMON_ID) {
//   await DigimonIds(digimon.id);
// }
