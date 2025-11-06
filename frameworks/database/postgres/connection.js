import { Sequelize } from 'sequelize';
import config from '../../../config/config.js';

class Connection {
  constructor() {
    if (Connection.instance) {
      return Connection.instance;
    }

    const sequelizeOptions = {
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      reconnectInterval: 5000,
    };

    this.connectionOptions = {
      retryInterval: 100, // beri jeda sedikit lebih lama antar retry
      currentRetries: 0,
    };

    this.sequelize = new Sequelize(config.postgres, sequelizeOptions);
    this.isConnected = false;
    this.isConnecting = false;
    this.connectionPromise = null;

    Connection.instance = this;
    this.initialize();
  }

  async initialize() {
    try {
      await this.connectToPostgres();
    } catch (error) {
      console.error('❌ Failed to initialize database connection:', error.message);
    }
  }

  async connectToPostgres() {
    if (this.isConnecting || this.isConnected) {
      return this.connectionPromise || this.sequelize;
    }

    this.isConnecting = true;

    this.connectionPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('🔄 Attempting to connect to PostgreSQL...');

        await this.sequelize.authenticate();

        this.isConnected = true;
        this.isConnecting = false;
        this.connectionOptions.currentRetries = 0;

        console.log('✅ PostgreSQL connection established successfully');

        this.setupConnectionHandlers();
        resolve(this.sequelize);
      } catch (error) {
        this.isConnecting = false;
        this.isConnected = false;

        console.error('❌ PostgreSQL connection failed:', error.message);

        if (this.connectionOptions.currentRetries < this.connectionOptions.maxRetries) {
          this.retryConnection();
          // Don't resolve/reject yet, let retry handle it
        } else {
          const errorMsg = `Database connection failed after ${this.connectionOptions.maxRetries} attempts`;
          console.error('🚨', errorMsg);
          reject(new Error(errorMsg));
        }
      }
    });

    return this.connectionPromise;
  }

  retryConnection() {
    this.connectionOptions.currentRetries++;
    const retryTime = this.connectionOptions.retryInterval;

    console.log(
      `🔄 Retrying PostgreSQL connection in ${retryTime}ms... (${this.connectionOptions.currentRetries}/${this.connectionOptions.maxRetries})`
    );

    setTimeout(() => {
      this.connectToPostgres();
    }, retryTime);
  }

  setupConnectionHandlers() {
    this.sequelize.addHook('afterDisconnect', async () => {
      this.isConnected = false;
    });
  }

  // ✅ ADDED: Methods yang dibutuhkan
  async waitForConnection() {
    if (this.isConnected) {
      return this.sequelize;
    }

    if (this.connectionPromise) {
      return await this.connectionPromise;
    }

    return await this.connectToPostgres();
  }

  async healthCheck() {
    try {
      await this.sequelize.authenticate();
      return { status: 'healthy', connected: true };
    } catch (error) {
      return {
        status: 'unhealthy',
        connected: false,
        error: error.message,
      };
    }
  }

  async close() {
    try {
      if (this.sequelize && this.isConnected) {
        await this.sequelize.close();
        this.isConnected = false;
        console.log('✅ Database connection closed successfully');
      }
    } catch (error) {
      console.error('❌ Error closing database connection:', error);
      throw error;
    }
  }

  getStatus() {
    return {
      connected: this.isConnected,
      connecting: this.isConnecting,
      retries: this.connectionOptions.currentRetries,
      maxRetries: this.connectionOptions.maxRetries,
    };
  }
}

// ✅ FIXED: Export singleton instance
export default new Connection();
