const { Router } = require("express");
const { getDigimonByIdHanlder } = require("../handlers/DgHandlers");

const DgRouter = Router();

DgRouter.get("/", getDigimonByIdHanlder);

module.exports = DgRouter;
