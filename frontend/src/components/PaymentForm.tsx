const PaymentForm = () => {
    return <form>
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value=""
          placeholder="1234 5678 9123 4567"
          required
        />
      </div>
      <div>
        <label>Expiry Date</label>
        <input
          type="text"
          value=""
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label>CVV</label>
        <input
          type="password"
          value=""
          placeholder="123"
          required
        />
      </div>
      <button type="submit">Submit Payment</button>
    </form>;
};

export default PaymentForm;
