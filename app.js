import express from 'express';
import { createServer } from 'node:http';
import Config from './config/config.js';
import serverConfig from './frameworks/webserver/server.js';
import expressConfig from './frameworks/webserver/express.js';
import routes from './frameworks/route/index.js';
import Connection from './frameworks/database/postgres/connection.js';

const app = express();
const server = createServer(app);

async function startApplication() {
  try {
    expressConfig(app);

    console.log('🔄 Initializing database connection...');
    await Connection.waitForConnection();

    routes(app, express);

    const { startServer } = serverConfig(app, Connection, server, Config);
    startServer();
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}
startApplication();
