import PasienController from "../controllers/Pasien.js";

export default function PasienRoute(express) {
  const router = express.Router();
  const controller = new PasienController();

  router.route("/save").post((req, res) => controller.save(req, res));

  return router;
}
