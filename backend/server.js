// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./api/auth');
const governanceRoutes = require('./api/governance');
const stakingRoutes = require('./api/staking');
const liquidityRoutes = require('./api/liquidity');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Database connection
mongoose.connect('mongodb://localhost:27017/pistable', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/staking', stakingRoutes);
app.use('/api/liquidity', liquidityRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
