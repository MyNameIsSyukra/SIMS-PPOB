import ServiceController from '../controllers/Service.js';

export default function ServiceRoute(express) {
  const router = express.Router();
  const controller = new ServiceController();

  router.route('/').post((req, res) => controller.save(req, res));
  router.route('/').get((req, res) => controller.load(req, res));

  return router;
}
