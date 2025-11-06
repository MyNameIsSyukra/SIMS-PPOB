import TransactionController from '../controllers/Transaction.js';

export default function TransactionRoute(express) {
  const router = express.Router();
  const controller = new TransactionController();

  router.route('/topup').post((req, res) => controller.topup(req, res));
  // router.route('/').get((req, res) => controller.load(req, res));

  return router;
}
