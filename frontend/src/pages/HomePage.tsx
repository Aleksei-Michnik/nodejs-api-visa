import React, { lazy, Suspense } from 'react';
import { submitPayment } from '../api/paymentService';

const PaymentForm = lazy(() => import('../components/PaymentForm'));
const PaymentList  = lazy(() => import('../components/PaymentList.tsx'));

const HomePage: React.FC = () => {
    const handlePaymentSubmit = async (paymentDetails: object) => {
        try {
            const newPayment = await submitPayment(paymentDetails);
            console.log('New payment structure:', newPayment);
            console.log('Payment submitted:', newPayment);
            if (newPayment) {
                console.log('Adding new payment to list:', newPayment);
            }
        } catch (error) {
            console.error('Error submitting payment:', error);
        }
    };
    return <div className="container flex flex-col items-center justify-center prose mx-auto">
      <h1>Payment Gateway</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentForm onSubmit={handlePaymentSubmit}/>
        <h2>Payment List</h2>
        <PaymentList onNewPayment={newPayment => console.log('New Payment:', newPayment)}/>
      </Suspense>
    </div>;
};

export default HomePage;
