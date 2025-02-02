import React, { useState } from 'react';

interface PaymentFormProps {
    onSubmit: (paymentDetails: {
        amount: string;
        cardNumber: string;
        cardHolder: string;
        expiry: string;
        cvv: string;
    }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({onSubmit}) => {
    const [amount, setAmount] = useState('1000');
    const [cardNumber, setCardNumber] = useState('5234 5678 9123 4567');
    const [cardHolder, setCardHolder] = useState('John Doe');
    const [expiry, setExpiry] = useState('12/22');
    const [cvv, setCvv] = useState('123');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ amount, cardNumber, cardHolder, expiry, cvv });
        setAmount('1000');
        setCardNumber('5234 5678 9123 4567');
        setCardHolder('John Doe');
        setExpiry('12/22');
        setCvv('123');
    };

    return <form onSubmit={handleSubmit}>
      <input
        type="hidden"
        value={amount}
      />
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          placeholder="5234 5678 9123 4567"
          required
        />
      </div>
      <div>
        <label>Card Holder Name</label>
        <input
          type="text"
          value={cardHolder}
          onChange={e => setCardHolder(e.target.value)}
          placeholder="John Doe"
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
      <button className="btn btn-primary" type="submit">Submit Payment</button>
    </form>;
};

export default PaymentForm;
