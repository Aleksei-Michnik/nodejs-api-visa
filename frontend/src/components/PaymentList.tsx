import React, {useEffect, useRef, useState} from 'react';
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
    const pageRef = useRef(page);
    const [generatedPayments, setGeneratedPayments] = useState(0);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const addPayment = (newPayment: Payment) => {
        console.log('New payment received');
        console.log('Page:', pageRef.current);
        setPayments(prevPayments => {
            const updatedPayments = [newPayment, ...prevPayments];
            return updatedPayments.slice(0, perPage * pageRef.current);
        });
        if (onNewPayment) {
            onNewPayment(newPayment);
        }
    };

    const fetchPayments = async (currentPage: number) => {
        console.log('Fetching payments...');
        console.log('Fetching page:', currentPage);
        try {
            const data = await getPayments({ page: currentPage, perPage: perPage, sort: 'desc' });
            if (data.length < perPage) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setPayments(prevPayments => currentPage === 1 ? data : [...prevPayments, ...data]);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loadingMore || !hasMore)
            return;
        console.log('Loading more...');
        console.log('Page:', pageRef.current);
        const nextPage = pageRef.current + 1;
        setPage(nextPage);
        setLoadingMore(true);
        await fetchPayments(nextPage);
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
            reconnectionAttempts: 20,
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
            setGeneratedPayments(prev => prev + 1); // Should be on Spawn payments only
            addPayment(newPayment);
        });

        return () => {
            socket.off('paymentAdded');
            socket.disconnect();
        };
    }, []);

    return <>
        <p>Generated Payments: {generatedPayments}</p>
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
