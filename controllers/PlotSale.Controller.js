const PlotSaleModel = require("../models/PlotSale.Model");
// const multer = require("multer");
const path = require("path");

// Controller functions

// Create a new plot sale with image upload
const createPlotSale = async (req, res) => {
  try {
    const { name, cnic, phoneNo, price, monthlyInstallment } = req.body;

    // Check if the required fields are provided
    if (!name || !cnic || !phoneNo || !price || !monthlyInstallment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new plot sale
    const newPlotSale = new PlotSaleModel({
      name,
      cnic,
      phoneNo,
      // cnicImage: `http://localhost:${process.env.PORT}/cnicImage/${req.file.path}`,
      cnicImage: req.file.path,
      price,
      monthlyInstallment,
    });

    // Save the plot sale to the database
    const savedPlotSale = await newPlotSale.save();

    res.status(201).json(savedPlotSale);
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All Plot Sales
const getAllPlotSales = async (req, res) => {
  try {
    const plotSales = await PlotSaleModel.find();
    if (plotSales.length !== 0) {
      res.status(200).json(plotSales);
    } else {
      res
        .status(500)
        .json({ success: false, message: "There is No any Plot Sale" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Plot Sale by ID
const getPlotSaleById = async (req, res) => {
  try {
    const plotSale = await PlotSaleModel.findById(req.params.id);
    if (plotSale) {
      res.status(200).json(plotSale);
    } else {
      res.json({ success: false, message: "ID Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Plot Sale
const updatePlotSaleById = async (req, res) => {
  try {
    // Find the plot sale by ID
    let plotSale = await PlotSaleModel.findById(req.params.id);

    if (!plotSale) {
      return res.status(404).json({ error: "Plot sale not found" });
    }

    // Update the plot sale fields
    plotSale.name = req.body.name || plotSale.name;
    plotSale.cnic = req.body.cnic || plotSale.cnic;
    plotSale.phoneNo = req.body.phoneNo || plotSale.phoneNo;
    plotSale.price = req.body.price || plotSale.price;
    plotSale.monthlyInstallment =
      req.body.monthlyInstallment || plotSale.monthlyInstallment;

    // Update the image path
    if (req.file) {
      plotSale.cnicImage = req.file.path;
    }

    // Save the updated plot sale
    const updatedPlotSale = await plotSale.save();

    res.json(updatedPlotSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Plot Sale
const deletePlotSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const plotSale = await PlotSaleModel.findById(id);
    if (plotSale) {
      await PlotSaleModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.json({ success: false, message: "ID Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlotSale,
  getAllPlotSales,
  getPlotSaleById,
  updatePlotSaleById,
  deletePlotSaleById,
};
