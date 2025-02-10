import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentForm from '../../src/components/PaymentForm';

describe('PaymentForm', () => {
    it('renders the form inputs correctly', () => {
        render(<PaymentForm />);
        expect(screen.getByLabelText(/card holder/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    });

    it('updates input values when typed', () => {
        render(<PaymentForm />);

        const cardHolderInput = screen.getByLabelText(/card holder/i);
        fireEvent.change(cardHolderInput, { target: { value: 'John Doe' } });

        // Verify input value updates
        expect((cardHolderInput as HTMLInputElement).value).toBe('John Doe');
    });

    it('calls the submit handler when form is valid', () => {
        const mockSubmit = vi.fn(); // Mock a submit handler
        render(<PaymentForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/card holder name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '5123123412341234' } });
        fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/26' } });
        fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
});
