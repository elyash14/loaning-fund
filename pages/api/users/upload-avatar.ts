import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './tmp',
    filename: (req, file, cb) =>
      cb(
        null,
        Date.now() +
          '-' +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname),
      ),
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.JPG' && ext !== '.jpeg' && ext !== '.JPEG') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single('avatar');

const uploadAvatar = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Process a POST request
uploadAvatar.use(uploadMiddleware).post((req: NextApiRequest, res: NextApiResponse) => {
  const { file } = req as any;
  res.status(200).json({ filename: file.filename });
});

export default uploadAvatar;

//TODO delete tmp folder in admin panel
