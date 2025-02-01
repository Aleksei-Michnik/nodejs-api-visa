exports.handleFraudCheck = (req, res) => {
    console.log('[Mock Visa API]: /anti-fraud endpoint hit.');
    console.log('Request body:', req.body);

    const { cardNumber } = req.body;

    if (cardNumber.startsWith('1234')) {
        return res.status(400).send({ pass: false, message: 'Fraudulent card detected' });
    }

    res.status(200).send({ pass: true, message: 'Anti-fraud check passed' });
};
