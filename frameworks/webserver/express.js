import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import express from "express";

function developmentExpressConfig(app) {
  const corsOptions = {
    origin: true, // Allow all origins in development
    credentials: true,
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(morgan('dev'));

  // Error handling untuk development (pindah ke akhir)
  return (err, req, res, next) => {
    console.error('Development Error:', err.stack);
    res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack
    });
  };
}

function productionExpressConfig(app) {
  // Security first
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  app.use(compression());

  // Strict CORS for production
  const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS policy violation'), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  };

  app.use(cors(corsOptions));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(morgan('combined'));

  // Additional security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Production error handler
  return (err, req, res, next) => {
    console.error('Production Error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  };
}

export default function expressConfig(app) {
  const errorHandler = process.env.NODE_ENV === 'development' 
    ? developmentExpressConfig(app) 
    : productionExpressConfig(app);
  
  // Add error handler at the end
  app.use(errorHandler);
  
  console.log(`✅ Express configured for ${process.env.NODE_ENV || 'development'} environment`);
}