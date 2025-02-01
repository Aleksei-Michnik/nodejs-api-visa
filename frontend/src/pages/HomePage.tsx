import { submitPayment } from '../api/paymentService';
import PaymentForm from '../components/PaymentForm';
import PaymentList from "../components/PaymentList.tsx";

const HomePage = () => {

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
      <PaymentList />
    </>;
};

export default HomePage;
