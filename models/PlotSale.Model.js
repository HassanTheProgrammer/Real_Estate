const mongoose = require("mongoose");

const PlotSaleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      requried: true,
    },
    cnicImage: {
      type: String,
      requried: true,
    },
    price: {
      type: String,
      required: true,
    },
    monthlyInstallment: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true }
);

const PlotSaleModel = mongoose.model("PloatSale", PlotSaleSchema);

module.exports = PlotSaleModel;
