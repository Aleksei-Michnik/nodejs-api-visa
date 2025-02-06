import React, { useState } from 'react';
import './PaymentForm.styles.css';

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

    return <form className="flex gap-8 items-center flex-wrap justify-center" onSubmit={handleSubmit}>
      <div className="payment-form basis-full w-full bg-gray-800 rounded-lg px-6 pt-8 pb-12 ring shadow-xl ring-gray-900/5 max-w-lg flex flex-wrap gap-2 text-left">
        <input
          type="hidden"
          value={amount}
        />
        <div className="w-full">
          <label className="label">Card Number</label>
          <input
            className="input w-full text-xl"
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            placeholder="5234 5678 9123 4567"
            required
          />
        </div>
        <div className="w-full">
          <label className="label">Card Holder Name</label>
          <input
            className="input w-full text-xl"
            type="text"
            value={cardHolder}
            onChange={e => setCardHolder(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="w-full flex gap-4">
        <div className="w-1/2">
          <label className="label">
            Expiry Date
          </label>
          <input
            className="input w-full text-xl"
            type="text"
            value={expiry}
            onChange={e => setExpiry(e.target.value)}
            placeholder="12/25"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="label">
            CVV
          </label>
          <input
            className="input w-full text-xl"
            type="password"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        </div>
      </div>
      <button className="btn btn-primary text-nowrap w-min" type="submit">Submit Payment</button>
    </form>;
};

export default PaymentForm;
