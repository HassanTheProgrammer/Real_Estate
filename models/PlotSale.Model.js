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
    totalPrice: {
      type: Number,
      required: true,
    },
    restAmount: {
      type: Number,
    },
    monthlyInstallment: {
      type: Number,
      requried: true,
    },
    totalInstallments: {
      type: Number,
      default: 0
    },
    submitInstallment: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const PlotSaleModel = mongoose.model("PloatSale", PlotSaleSchema);

module.exports = PlotSaleModel;
