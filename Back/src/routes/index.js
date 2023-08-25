const { Router } = require("express");
const DgRouter = require("./DgRouter");

const router = Router();

router.use("/digimon", DgRouter);

module.exports = router;
