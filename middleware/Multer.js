// middlewares/MulterMiddleware.js
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

const uploadPath = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

export class MulterMiddleware {
  constructor() {
    // Tentukan storage
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    });

    // Filter untuk hanya menerima PDF
    this.fileFilter = (req, file, cb) => {
      if (file.mimetype !== 'application/pdf') {
        cb(new Error('Silahkan mengupload file dengan format PDF!'), false);
      } else {
        cb(null, true);
      }
    };

    // Inisialisasi multer
    this.upload = multer({
      storage: this.storage,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: this.fileFilter,
    });
  }
}
