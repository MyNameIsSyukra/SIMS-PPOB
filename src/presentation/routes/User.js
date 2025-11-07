import UserController from '../controllers/User.js';
import { MulterMiddleware } from '../../../middleware/Multer.js';

export default function UserRoutes(express) {
  const router = express.Router();
  const controller = new UserController();
  const multerMiddleware = new MulterMiddleware();

  router.route('/profile').get((req, res) => controller.getProfile(req, res));
  router.route('/balance').get((req, res) => controller.getBalance(req, res));
  router.route('/update').put((req, res) => controller.updateProfile(req, res));
  router.put('/image', multerMiddleware.upload.single('file'), (req, res) => controller.uploadImage(req, res));

  return router;
}
