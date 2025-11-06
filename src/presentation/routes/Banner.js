import BannerController from '../controllers/Banner.js';

export default function BannerRoute(express) {
  const router = express.Router();
  const controller = new BannerController();

  router.route('/save').post((req, res) => controller.save(req, res));

  return router;
}
