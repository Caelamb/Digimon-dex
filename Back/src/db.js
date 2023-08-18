require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/digimon`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Digimon, Level, Type, Attributes, Fields, Skills, PriorE, NextE } =
  sequelize.models;

Digimon.belongsToMany(NextE, { through: "Digimon_NextE" });
NextE.belongsToMany(Digimon, { through: "Digimon_NextE" });

Digimon.belongsToMany(PriorE, { through: "Digimon_PriorE" });
PriorE.belongsToMany(Digimon, { through: "Digimon_PriorE" });

Digimon.belongsToMany(Fields, { through: "Digimon_Fields" });
Fields.belongsToMany(Digimon, { through: "Digimon_Fields" });

Digimon.belongsToMany(Attributes, { through: "Digimon_Attributes" });
Attributes.belongsToMany(Digimon, { through: "Digimon_Attributes" });

Digimon.belongsToMany(Type, { through: "Digimon_Type" });
Type.belongsToMany(Digimon, { through: "Digimon_Type" });

Digimon.belongsToMany(Level, { through: "Digimon_Level" });
Level.belongsToMany(Digimon, { through: "Digimon_Level" });

Digimon.belongsToMany(Skills, { through: "Digimon_Skilss" });
Skills.belongsToMany(Digimon, { through: "Digimon_Skilss" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
