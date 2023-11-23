// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// require("./connect");
// require("dotenv").config();

// const PORT = process.env.PORT || 8001;

// const app = express();
// app.use(express.json());

// // Storage Engine
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 },
// });

// // Expose upload iamges folder
// app.use("/profile", express.static("upload/images"));

// // Routes
// app.post("/upload", upload.single("profile"), (req, res) => {
//   res.json({
//     success: 1,
//     profile_url: `http://localhost:${PORT}/profile/${req.file.filename}`,
//   });
// });

// // Handle Error
// function handleError(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     res.json({
//       success: 0,
//       message: err.message,
//     });
//   }
// }
// app.use(handleError);

// // Start Server
// app.listen(PORT, () => console.log(`==> SERVER STARTED ON PORT ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

const plotSaleRoutes = require("./routes/PlotSale.Routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

require("./connect");

// Middlewares
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// console.log(req);

// Use the plotSaleRoutes for routes related to plot sales
app.use("/plot-sales", plotSaleRoutes);

// Start Server
app.listen(PORT, () => console.log(`==> SERVER STARTED ON PORT ${PORT}`));
