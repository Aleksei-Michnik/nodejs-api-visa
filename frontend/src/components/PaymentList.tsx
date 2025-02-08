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
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const perPage = 10;

    const addPayment = (newPayment: Payment) => {
        setPayments(prevPayments => {
            const updatedPayments = [newPayment, ...prevPayments];
            return updatedPayments.slice(0, perPage * page);
        });
        if (onNewPayment) {
            onNewPayment(newPayment);
        }
    };

    const fetchPayments = async (currentPage: number) => {
        console.log('Fetching payments...');
        console.log('Page:', currentPage);
        console.log('Page State:', page);
        try {
            const data = await getPayments({ page: currentPage, perPage: perPage, sort: 'desc' });
            if (data.length < perPage) {
                setHasMore(false);
            }
            setPayments(prevPayments => [...prevPayments, ...data]);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loadingMore || !hasMore)
            return;
        const nextPage = page + 1;
        setLoadingMore(true);
        await fetchPayments(nextPage);
        setPage(nextPage);
        setLoadingMore(false);
    };

    useEffect(() => {
        const initPayments = async () => {
            setLoading(true);
            await fetchPayments(1);
            setLoading(false);
        };
        initPayments();

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
        {hasMore && <button className="btn text-nowrap w-min" onClick={handleLoadMore}>Load previous</button>}
    </>;
};

export default PaymentList;
