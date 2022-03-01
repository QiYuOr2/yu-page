import { createRouter } from '../common/createRouter';
import { join } from 'path';
import * as Multer from 'multer';

const upload = Multer({ dest: join(__dirname, '../../upload/') });

const UploadScope = {
  Avatar: 'avatar',
};

const uploadConfig = upload.fields([{ name: UploadScope.Avatar, maxCount: 1 }]);

export const CommonController = createRouter('/common', (r) => {
  r.post('/upload', uploadConfig, (req, res) => {
    res.json(req);
  }).comment('上传');
});
