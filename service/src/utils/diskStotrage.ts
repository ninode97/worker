import { diskStorage } from 'multer';
export const myStorage = diskStorage({
  // Specify where to save the file
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  // Specify the file name
  filename: (req, file, cb) => {
    cb(null, `${Math.random()}`);
  },
});
