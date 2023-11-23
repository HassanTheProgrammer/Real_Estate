const PlotSaleModel = require("../models/PlotSale.Model");
const multer = require("multer");
const path = require("path");

// Storage Engine for Multer
const storage = multer.diskStorage({
  destination: "../upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// Controller functions

// Create a new plot sale with image upload
const createPlotSale = async (req, res) => {
  try {
    const { name, cnic, phoneNo, price, monthlyInstallment } = req.body;
    console.log(req.body);

    // Check if the required fields are provided
    if (!name || !cnic || !phoneNo || !price || !monthlyInstallment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload image using Multer
    upload.single("cnicImage")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Create a new plot sale
      const newPlotSale = new PlotSaleModel({
        name,
        cnic,
        phoneNo,
        cnicImage: `http://localhost:${process.env.PORT}/profile/${req.file.filename}`,
        price,
        monthlyInstallment,
      });

      // Save the plot sale to the database
      const savedPlotSale = await newPlotSale.save();

      res.status(201).json(savedPlotSale);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPlotSale,
};
