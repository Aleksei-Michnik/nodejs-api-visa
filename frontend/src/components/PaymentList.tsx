import React from 'react';

interface Payment {
    id: number;
    amount: number;
    cardNumber: string;
    cardHolder: string;
    status: 'success' | 'declined' | 'fraud';
    date: string;
}

interface PaymentListProps {
    payments: Payment[];
}

const PaymentList: React.FC<PaymentListProps> = ({ payments }) => {
    return <ul>
      {payments.map((payment, i) => (
        <li key={i}>{payment.id} {payment.amount}</li>
      ))}
    </ul>;
};

export default PaymentList;
