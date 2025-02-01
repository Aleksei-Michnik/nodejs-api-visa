import React from 'react';

interface Payment {
    _id: number;
    amount: number;
    cardNumber: string;
    cardHolder: string;
    status: 'success' | 'declined' | 'fraud';
    createdAt: string;
}

interface PaymentListProps {
    payments: Payment[];
}

const PaymentList: React.FC<PaymentListProps> = ({ payments }) => {
    console.log('Payments', payments);
    return <ul>
      {payments.map((payment) => (
        <li key={payment._id}>{payment.cardHolder} {payment.amount} {payment.createdAt}</li>
      ))}
    </ul>;
};

export default PaymentList;
