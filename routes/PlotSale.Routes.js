const express = require("express");
const plotSaleController = require("../controllers/PlotSale.Controller");
const upload = require("../utilites/upload");

const router = express.Router();

// Route to create a new plot sale with image upload
router.post(
  "/createPloatSale",
  upload.single("cnicImage"),
  plotSaleController.createPlotSale
);

router.get("/getAllPlotsSales", plotSaleController.getAllPlotSales);
router.get("/getPlotSaleById/:id", plotSaleController.getPlotSaleById);

router.post(
  "/updatePloatSaleById/:id",
  upload.single("cnicImage"),
  plotSaleController.updatePlotSaleById
);

router.delete("/deletePlotSaleById/:id", plotSaleController.deletePlotSaleById);
module.exports = router;
