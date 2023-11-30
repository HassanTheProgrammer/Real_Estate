const { response } = require("express");
const PlotSaleModel = require("../models/PlotSale.Model");
// const multer = require("multer");
const path = require("path");

// Controller functions

// Create a new plot sale with image upload
const createPlotSale = async (req, res) => {
  try {
    const { name, cnic, phoneNo, totalPrice, monthlyInstallment } = req.body;

    // check empty input fields
    if (!name || !cnic || !phoneNo || !totalPrice || !monthlyInstallment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // check dublicat CNIC
    if (await PlotSaleModel.findOne({ cnic })) {
      return res.status(400).json({ success: false, message: "cnic already exists" })
    } else {
      try {
        // Create a new plot sale
        await PlotSaleModel.create({
          name,
          cnic,
          phoneNo,
          cnicImage: req.file.path,
          totalPrice,
          restAmount: totalPrice,
          monthlyInstallment,
          totalInstallments: totalPrice / monthlyInstallment,
        });
        res.status(200).json({ success: true, message: "plot sale created successfully" })
      } catch (error) {
        res.status(400).json({
          success: false,
          messag: error.message
        })
      }
    }



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
    // plotSale.totalPrice = req.body.totalPrice || plotSale.totalPrice;
    // Monthly Installment
    // plotSale.monthlyInstallment =
    //   req.body.monthlyInstallment || plotSale.monthlyInstallment;

    // Total Installments
    // plotSale.totalInstallments =
    // plotSale.totalInstallments !==
    // plotSale.totalPrice / plotSale.monthlyInstallment
    //   ? plotSale.totalInstallments
    //   : plotSale.totalPrice / plotSale.monthlyInstallment;

    // Rest Amount
    // plotSale.restAmount =
    //   plotSale.totalPrice -
    //   (plotSale.totalPrice / plotSale.monthlyInstallment -
    //     plotSale.totalInstallments) *
    //     plotSale.monthlyInstallment;

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

// Submit Installment
const submitInstallmentById = async (req, res) => {
  try {
    const plotSale = await PlotSaleModel.findById(req.params.id);
    if (plotSale) {
      if (plotSale.totalInstallments > 0) {
        plotSale.submitInstallment = true;
        plotSale.totalInstallments = plotSale.totalInstallments - 1;
        plotSale.restAmount -= plotSale.monthlyInstallment;

        await plotSale.save();

        res
          .status(200)
          .json({ success: 1, message: "Installment Submitted Successfully" });
      } else {
        res.status(200).json({
          success: false,
          message: "You Already Submit All Installments!",
        });
      }
    } else {
      res.status(500).json({ success: 0, message: "ID not found" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
};
module.exports = {
  createPlotSale,
  getAllPlotSales,
  getPlotSaleById,
  updatePlotSaleById,
  deletePlotSaleById,
  submitInstallmentById,
};
