import AuthenticateJWT from '../../middleware/Auth.js';
import AuthRoutes from '../../src/presentation/routes/Auth.js';
import BannerRoute from '../../src/presentation/routes/Banner.js';
import ServiceRoute from '../../src/presentation/routes/Service.js';
import TransactionRoute from '../../src/presentation/routes/Transaction.js';
import UserRoutes from '../../src/presentation/routes/User.js';

export default function routes(app, express) {
  app.use(
    '/api',
    (router => {
      router.use('/auth', AuthRoutes(express));
      router.use('/banner', BannerRoute(express));
      router.use('/service', AuthenticateJWT, ServiceRoute(express));
      router.use('/transaction', AuthenticateJWT, TransactionRoute(express));
      router.use('/user', AuthenticateJWT, UserRoutes(express));

      return router;
    })(express.Router())
  );
}
