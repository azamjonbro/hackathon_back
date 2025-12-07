const multer = require("multer");
const fs = require("fs");
const path = require("path");

// uploads papkaning absolute yo‘li
const uploadDir = "/var/www/hackathon_back/uploads";

// papka mavjud bo'lmasa yaratamiz
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});

module.exports = multer({ storage });
