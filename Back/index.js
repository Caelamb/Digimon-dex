const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { seedDatabase } = require("./src/seed/Seeding.js");

conn.sync({ force: true }).then(() => {
  seedDatabase();
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
