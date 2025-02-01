import React, { useState, useEffect } from 'react';
import { getPayments, submitPayment } from '../api/paymentService';
import PaymentForm from '../components/PaymentForm';
import PaymentList from "../components/PaymentList.tsx";

const HomePage: React.FC = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function fetchPayments() {
            try {
                const data = await getPayments();
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {}
        }
        fetchPayments();
    }, []);

    const handlePaymentSubmit = async (paymentDetails: object) => {
        try {
            const newPayment = await submitPayment(paymentDetails);
            console.log('Payment submitted:', newPayment);
        } catch (err) {
            console.error('Error submitting payment:', err);
        }
    };
    return <>
      <h1>Payment Gateway</h1>
      <PaymentForm onSubmit={handlePaymentSubmit} />
      <h2>Payment List</h2>
      <PaymentList payments={payments}/>
    </>;
};

export default HomePage;
