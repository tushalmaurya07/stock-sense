const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { CLIENT_URL } = require('./config/env');
const { isDbConnected } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const transferRoutes = require('./routes/transferRoutes');
const adjustmentRoutes = require('./routes/adjustmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');
const stockRoutes = require('./routes/stockRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const locationRoutes = require('./routes/locationRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const reorderRuleRoutes = require('./routes/reorderRuleRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();

// Middlewares
app.use(cors({ origin: CLIENT_URL || '*', credentials: true }));
app.options('*', cors({ origin: CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isDbConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    service: 'StockSense API',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/reorder-rules', reorderRuleRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/team', teamRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
