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
const MOCK_VISA_API_PORT = process.env.MOCK_VISA_API_PORT || 3001;
app.listen(MOCK_VISA_API_PORT, () => {
    console.log(`Mock Visa API is running on http://localhost:${MOCK_VISA_API_PORT}`);
});

module.exports = app;
