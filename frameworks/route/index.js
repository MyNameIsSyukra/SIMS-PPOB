import AuthenticateJWT from '../../middleware/Auth.js';
import AuthRoutes from '../../src/presentation/routes/Auth.js';
import BannerRoute from '../../src/presentation/routes/Banner.js';

export default function routes(app, express) {
  app.use(
    '/api',
    (router => {
      router.use('/auth', AuthRoutes(express));
      router.use('/banner', BannerRoute(express));

      return router;
    })(express.Router())
  );
}
