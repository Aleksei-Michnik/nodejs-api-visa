import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
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

const PaymentList: React.FC<PaymentListProps> = ({ onNewPayment }) => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const addPayment = (newPayment: Payment) => {
        setPayments((prevPayments) => [newPayment, ...prevPayments]);
        if (onNewPayment) {
            onNewPayment(newPayment);
        }
    };

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getPayments({ limit: 20, sort: 'desc' });
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();

        const socket: Socket = io(import.meta.env.VITE_BACKEND_API_BASE_URL, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            timeout: 10000,
            path: '/socket.io/',
        });

        socket.on('connect', () => {
            console.log('WebSocket connected successfully');
        });
        socket.on('connect_error', (err) => {
            console.error('WebSocket connection error:', err.message);
        });


        socket.on('paymentAdded', (newPayment: Payment) => {
            console.log('New payment received via WebSocket:', newPayment);
            addPayment(newPayment);
        });

        return () => {
            socket.off('paymentAdded');
            socket.disconnect();
        };
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
