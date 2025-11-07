import BannerController from '../controllers/Banner.js';

export default function BannerRoute(express) {
  const router = express.Router();
  const controller = new BannerController();

  router.route('/banner').post((req, res) => controller.save(req, res));
  router.route('/banner').get((req, res) => controller.load(req, res));

  return router;
}
