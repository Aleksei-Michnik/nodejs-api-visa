import { useState, useEffect } from 'react';
import { submitPayment } from '../api/paymentService';
import PaymentForm from '../components/PaymentForm';
import PaymentList from "../components/PaymentList.tsx";

const HomePage = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function fetchPayments() {
            try {
                // @ts-ignore
                setPayments([{
                    id: 1,
                    amount: 1000,
                    cardNumber: '1234 5678 9123 4567',
                    cardHolder: '<NAME>',
                    expiry: '12/22',
                    cvv: '123'
                }]);
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
