const express = require("express");
const plotSaleController = require("../controllers/PlotSale.Controller");

const router = express.Router();

// Route to create a new plot sale with image upload
router.post("/createPloatSale", plotSaleController.createPlotSale);

module.exports = router;
