import { Schema } from 'mongoose';

export const PaymentSchema = new Schema({
    cardNumber: String,
    cardHolder: String,
    amount: Number,
    currency: String,
    status: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
