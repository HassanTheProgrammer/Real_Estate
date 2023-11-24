// Custom Modules
const multer = require("multer");

// Node Js Core Modules
const fs = require("fs");
const path = require("path");

// Storage
const storage = multer.diskStorage({
  // Check, Create and Set Destination
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/files")) {
      fs.mkdirSync("public/files");
    }

    cb(null, "public/files");
  },

  // Define File Name
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname);

  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    return cb(new Error("Only jpg, jpeg and png files are allowed"));
  }

  return cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  //   limits: { fileSize: 100000 },
});

module.exports = upload;
