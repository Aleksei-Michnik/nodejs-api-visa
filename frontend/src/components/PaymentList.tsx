import React, { useEffect, useState } from 'react';
import { getPayments } from '../api/paymentService.tsx';

interface Payment {
    _id: number;
    amount: number;
    cardNumber: string;
    cardHolder: string;
    status: 'success' | 'declined' | 'fraud';
    createdAt: string;
}

interface PaymentListProps {
    onNewPayment?: (payment: Payment) => void;
}

const PaymentList: React.FC<PaymentListProps> = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPayments() {
            try {
                const data = await getPayments({limit: 20, sort: 'desc' });
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPayments();
    }, []);

    console.log('Payments', payments);
    return <>
      {loading ? (<p>Loading...</p>)
          : (<ul>
            {payments.map((payment) => (
              <li key={payment._id}>{payment.cardHolder} - ${payment.amount} - {payment.status} - {new Date(payment.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>)}
    </>;
};

export default PaymentList;
