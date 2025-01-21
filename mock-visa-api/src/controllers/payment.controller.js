exports.handlePayment = (req, res) => {
    const { amount } = req.body;

    if (amount > 1000) {
        return res.status(400).send({ status: 'failed', message: 'Transaction exceeds the allowed limit' });
    }

    res.status(200).send({ status: 'approved', message: 'Payment processed successfully' });
};
