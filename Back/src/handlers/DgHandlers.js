const { getAllDigimon } = require("../controllers/DgController");

const getDigimonByIdHanlder = async (req, res) => {
  try {
    const digimon = await getAllDigimon();
    res.status(200).json(digimon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in the sever" });
  }
};

module.exports = {
  getDigimonByIdHanlder,
};
