import AuthenticateJWT from '../../middleware/Auth.js';
import AuthRoutes from '../../src/presentation/routes/Auth.js';
import PasienRoute from '../../src/presentation/routes/Pasien.js';

export default function routes(app, express) {
  app.use(
    '/api',
    (router => {
      router.use('/auth', AuthRoutes(express));
      router.use('/pasien', AuthenticateJWT, PasienRoute(express));

      return router;
    })(express.Router())
  );
}
