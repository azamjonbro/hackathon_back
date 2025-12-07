const multer = require('multer');
const path = require('path');

// Rasm papkasi /var/www/hackathon_back/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads'); // bu papka mavjud bo'lishi va www-data ga o'qish/yozish huquqi bo'lishi kerak
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
