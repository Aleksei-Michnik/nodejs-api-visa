import React, { useState } from 'react';
import { spawnPayments } from '../api/paymentService.tsx';
import './PaymentForm.styles.css';

interface PaymentFormProps {
    onSubmit: (paymentDetails: {
        amount: number;
        cardNumber: string;
        cardHolder: string;
        expiry: string;
        cvv: string;
    }) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({onSubmit}) => {
    const [amount, setAmount] = useState('1000');
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSpawning, setIsSpawning] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            amount: parseFloat(amount),
            cardNumber: cardNumber.replace(/\s/g, ''),
            cardHolder,
            expiry,
            cvv
        });
        setAmount('1000');
        setCardNumber('');
        setCardHolder('');
        setExpiry('');
        setCvv('');
    };

    const handleSpawnPayments = async () => {
        setIsSpawning(true);
        try {
            await spawnPayments();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error spawning payments:', error.message);
            } else {
                console.error('Error spawning payments:', error);
            }
            alert('Failed to spawn payments.');
        } finally {
            setIsSpawning(false);
        }
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
      <button
        className="btn text-nowrap w-min"
        type="button"
        onClick={handleSpawnPayments}
        disabled={isSpawning}
      >
        {isSpawning ? 'Spawning...' : 'Spawn Payments'}
      </button>
    </form>;
};

export default PaymentForm;
