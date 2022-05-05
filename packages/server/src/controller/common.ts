import { createRouter } from '../common/createRouter';
import { join } from 'path';
import * as Multer from 'multer';
import { renameSync } from 'fs';
import { Yu } from '../common/yu';

const upload = Multer({ dest: join(__dirname, '../../upload/') });

// const UploadScope = {
//   Avatar: 'avatar',
// };

const uploadConfig = upload.any();

export const CommonController = createRouter('/common', (r) => {
  r.post('/upload', uploadConfig, (req, res) => {
    const filename = req.files[0].originalname.split('.');
    const ext = filename[filename.length - 1];
    const newName = `${Date.now().toString()}.${ext}`;

    renameSync(req.files[0].path, join(__dirname, '../../upload/', newName));
    
    res.json(Yu.success(`${/upload-image/}${newName}`));
  }).comment('上传');
});
