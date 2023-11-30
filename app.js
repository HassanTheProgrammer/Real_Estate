const express = require("express");
const mongoose = require("mongoose");

const plotSaleRoutes = require("./routes/PlotSale.Routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

require("./config/db.config.JS");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the plotSaleRoutes for routes related to plot sales
app.use("/plot-sales", plotSaleRoutes);

// Start Server
app.listen(PORT, () => console.log(`==> SERVER STARTED ON PORT ${PORT}`));
