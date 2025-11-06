import AuthController from "../controllers/Auth.js";

export default function AuthRoutes(express) {
    const router = express.Router();
    const controller = new AuthController();

    router.route("/register").post((req, res) => controller.register(req, res));
    router.route("/login").post((req, res) => controller.login(req, res));
    return router;
}