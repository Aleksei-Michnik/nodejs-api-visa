import React, { useState, useEffect, lazy, Suspense } from 'react';
import { getPayments, submitPayment } from '../api/paymentService';

const PaymentForm = lazy(() => import('../components/PaymentForm'));
const PaymentList  = lazy(() => import('../components/PaymentList.tsx'));

const HomePage: React.FC = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPayments() {
            setLoading(true);
            try {
                const data = await getPayments();
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPayments();
    }, []);

    const handlePaymentSubmit = async (paymentDetails: object) => {
        try {
            const newPayment = await submitPayment(paymentDetails);
            console.log('New payment structure:', newPayment);
            setPayments((prevPayments: any[]) => [...prevPayments, newPayment]);
            console.log('Payment submitted:', newPayment);
        } catch (err) {
            console.error('Error submitting payment:', err);
        }
    };
    return <div className="container">
      <h1>Payment Gateway</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentForm onSubmit={handlePaymentSubmit} />
        <h2>Payment List</h2>
        {loading ? <p>Loading...</p> : <PaymentList payments={payments} />}
      </Suspense>
    </div>;
};

export default HomePage;
