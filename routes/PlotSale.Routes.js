const express = require("express");
const plotSaleController = require("../controllers/PlotSale.Controller");
const upload = require("../utilites/upload");

const router = express.Router();

// Route to create a new plot sale with image upload
router.post(
  "/createPloatSale",
  // upload.single("cnicImage"),
  upload.fields([
    {
      name: "uploads",
      maxCount: 5,
    },
  ]),
  plotSaleController.createPlotSale
);

router.get("/getAllPlotsSales", plotSaleController.getAllPlotSales);
router.get("/getPlotSaleById/:id", plotSaleController.getPlotSaleById);

router.post(
  "/updatePloatSaleById/:id",
  upload.single("images"),
  plotSaleController.updatePlotSaleById
);

router.delete("/deletePlotSaleById/:id", plotSaleController.deletePlotSaleById);

router.patch(
  "/submitInstallmentById/:id",
  plotSaleController.submitInstallmentById
);

module.exports = router;
