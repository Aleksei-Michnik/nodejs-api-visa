exports.handlePayment = (req, res) => {
    console.log('[Mock Visa API]: /payments endpoint hit.');
    console.log('Request body:', req.body);

    const { amount } = req.body;

    if (amount > 1000) {
        return res.status(200).send({ status: 'failed', message: 'Transaction exceeds the allowed limit' });
    }

    res.status(200).send({ status: 'approved', message: 'Payment processed successfully' });
};
