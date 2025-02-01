import React, { useState, useEffect } from 'react';
import { getPayments, submitPayment } from '../api/paymentService';
import PaymentForm from '../components/PaymentForm';
import PaymentList from "../components/PaymentList.tsx";

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
    return <>
      <h1>Payment Gateway</h1>
      <PaymentForm onSubmit={handlePaymentSubmit} />
      <h2>Payment List</h2>
      {loading ? <p>Loading...</p> : <PaymentList payments={payments} />}
    </>;
};

export default HomePage;
