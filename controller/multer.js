const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta existe
const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Salva em public/uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
module.exports = upload;