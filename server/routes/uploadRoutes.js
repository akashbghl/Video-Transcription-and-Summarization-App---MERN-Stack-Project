import express from 'express'
import multer from 'multer';

import processVideo from '../controllers/processConroller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload', upload.single('video'), processVideo);


export default router;
