import React, { useState } from 'react';

interface PaymentFormProps {
    onSubmit: (paymentDetails: {
        cardNumber: string;
        expiry: string;
        cvv: string;
    }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({onSubmit}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ cardNumber, expiry, cvv });
        setCardNumber('');
        setExpiry('');
        setCvv('');
    };

    return <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          placeholder="1234 5678 9123 4567"
          required
        />
      </div>
      <div>
        <label>Expiry Date</label>
        <input
          type="text"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label>CVV</label>
        <input
          type="password"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
          placeholder="123"
          required
        />
      </div>
      <button type="submit">Submit Payment</button>
    </form>;
};

export default PaymentForm;
