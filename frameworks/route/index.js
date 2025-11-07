import AuthenticateJWT from '../../middleware/Auth.js';
import AuthRoutes from '../../src/presentation/routes/Auth.js';
import BannerRoute from '../../src/presentation/routes/Banner.js';
import ServiceRoute from '../../src/presentation/routes/Service.js';
import TransactionRoute from '../../src/presentation/routes/Transaction.js';
import UserRoutes from '../../src/presentation/routes/User.js';
import path from 'node:path';

export default function routes(app, express) {
  app.use(
    (router => {
      router.use('/static', express.static(path.join(process.cwd(), 'uploads')));
      router.use(AuthRoutes(express));
      router.use(BannerRoute(express));
      router.use(AuthenticateJWT, ServiceRoute(express));
      router.use(AuthenticateJWT, TransactionRoute(express));
      router.use(AuthenticateJWT, UserRoutes(express));

      return router;
    })(express.Router())
  );
}
