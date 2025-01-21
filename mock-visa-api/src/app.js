const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentController = require('./controllers/payment.controller');
const fraudController = require('./controllers/fraud.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock API endpoints
app.post('/payments', paymentController.handlePayment);
app.post('/anti-fraud', fraudController.handleFraudCheck);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Mock Visa API is running on http://localhost:${PORT}`);
});

module.exports = app;
