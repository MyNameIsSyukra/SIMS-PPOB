import TransactionController from '../controllers/Transaction.js';

export default function TransactionRoute(express) {
  const router = express.Router();
  const controller = new TransactionController();

  router.route('/transaction').post((req, res) => controller.transaction(req, res));
  router.route('/history').get((req, res) => controller.getAllTransaction(req, res));
  router.route('/historyByUserId').get((req, res) => controller.getAllTransactionByUserID(req, res));
  router.route('/topup').post((req, res) => controller.topup(req, res));

  return router;
}
