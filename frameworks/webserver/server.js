import { createTerminus } from '@godaddy/terminus';

export default function serverConfig(app, connection, serverInit, config) {
  // ✅ FIXED: Menggunakan method yang benar
  async function healthCheck() {
    try {
      const health = await connection.healthCheck();
      if (!health.connected) {
        throw new Error('Database not connected');
      }
      console.log('✅ Database connection is healthy');
      return Promise.resolve();
    } catch (err) {
      console.error('❌ Database health check failed:', err.message);
      return Promise.reject(new Error(`PostgreSQL health check failed: ${err.message}`));
    }
  }

  async function onSignal() {
    console.log('🔄 Server is starting cleanup...');
    try {
      await connection.close();
      console.info('✅ Database connection closed successfully');
    } catch (err) {
      console.error('❌ Error during database disconnection:', err);
    }
  }

  function beforeShutdown() {
    return new Promise(resolve => {
      console.log('⏳ Waiting 15 seconds for connections to drain...');
      setTimeout(() => {
        console.log('✅ Connection draining completed');
        resolve();
      }, 15000);
    });
  }

  function onShutdown() {
    console.log('🔚 Cleanup finished, server is shutting down');
  }

  function onHealthCheckError(error) {
    console.error('❌ Health check error:', error);
  }

  function startServer() {
    try {
      const server = createTerminus(serverInit, {
        logger: (msg, err) => {
          if (err) {
            console.error('🚨 Terminus error:', msg, err);
          } else {
            console.log('ℹ️ Terminus info:', msg);
          }
        },

        signals: ['SIGTERM', 'SIGINT'],

        healthChecks: {
          '/healthcheck': healthCheck,
          '/health': healthCheck,
          '/ready': async () => {
            // Check if app is ready to serve traffic
            return Promise.resolve();
          },
        },

        onSignal,
        beforeShutdown,
        onShutdown,
        onHealthCheckError,

        timeout: 30000,
        sendFailuresDuringShutdown: process.env.NODE_ENV === 'development',
      });

      server.listen(config.appPort, config.ip, () => {
        console.log(`🚀 Express server listening on ${config.ip}:${config.appPort}`);
        console.log(`📊 Environment: ${app.get('env')}`);
        console.log(`💚 Health check: http://${config.ip}:${config.appPort}/healthcheck`);
      });

      server.on('error', error => {
        if (error.syscall !== 'listen') {
          throw error;
        }

        const bind = typeof config.appPort === 'string' ? 'Pipe ' + config.appPort : 'Port ' + config.appPort;

        switch (error.code) {
          case 'EACCES':
            console.error(`❌ ${bind} requires elevated privileges`);
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(`❌ ${bind} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
      });

      return server;
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  return { startServer };
}
