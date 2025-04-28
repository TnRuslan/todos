import todosRouter from './api/todos.route';
import userRouter from './api/user.route';

import { logger } from '@/middleware/loger.middleware';
import { Post } from '@/model/post.model';
import { info } from 'console';
import type { Application } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'upload');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, UPLOAD_DIR);
  },
  filename: (req, file, cd) => {
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.get('/api', logger, async (_req, res) => {
      const data = await Post.find().select({ __v: 0 });
      info(process.cwd());
      res.json({ message: 'API Running', data });
    });

    this.app.post('/api/upload', upload.single('file'), (req, res) => {
      info('[INFO] Received file: ', req.file?.originalname);
      res.json({ status: 'ok', filename: req.file?.originalname });
    });

    this.app.get('/api/files', (req, res) => {
      fs.readdir(UPLOAD_DIR, (err, files) => {
        if (err) {
          return res
            .status(500)
            .json({ error: 'Failed to read file directory' });
        }

        const fileList = files.map((file) => {
          const filePath = path.join(UPLOAD_DIR, file);
          const fileStats = fs.statSync(filePath);

          return {
            file,
            size: fileStats.size,
          };
        });

        res.json({ files: fileList });
      });
    });

    this.app.get('/api/files/:filename', (req, res) => {
      const filePath = path.join(UPLOAD_DIR, req.params.filename);
      info('[INFO] Downloading file: ', req.params.filename);

      if (fs.existsSync(filePath)) {
        res.download(filePath);
      } else {
        res.status(404).send('File not found');
      }
    });

    this.app.use('/api/todos', todosRouter);
    this.app.use('/api/user', userRouter);
  }
}

export default AppRouter;
