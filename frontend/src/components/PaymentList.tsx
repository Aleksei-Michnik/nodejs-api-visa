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
    const perPage = 10;

    const addPayment = (newPayment: Payment) => {
        setPayments(prevPayments => {
            const updatedPayments = [newPayment, ...prevPayments];
            return updatedPayments.slice(0, perPage);
        });
        if (onNewPayment) {
            onNewPayment(newPayment);
        }
    };

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getPayments({ limit: perPage, sort: 'desc' });
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
          : (<table>
            <thead>
            <tr>
              <th>Card Holder</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.cardHolder}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.status}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            </tbody>
          </table>)}
    </>;
};

export default PaymentList;
