const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB;

mongoose
  .connect(url)
  .then(() => console.log(`==> MONGO_DB CONNECTED`))
  .catch((error) =>
    console.error(`==> MONGO_DB CONNECTION ERROR <==\n==>Error:\n${error}`)
  );
