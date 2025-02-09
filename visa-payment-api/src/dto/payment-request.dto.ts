import { IsString, Matches, Length, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class PaymentRequestDto {
    @IsString()
    @Matches(/^[0-9]{16}$/, { message: 'Card number must contain exactly 16 digits.' })
    readonly cardNumber: string;

    @IsString()
    @Matches(/^[a-zA-Z\s\-]+$/, { message: 'Cardholder name must only contain letters, spaces, and dashes.' })
    @Length(5, 50, { message: 'Cardholder name must be between 5 and 50 characters.' })
    readonly cardHolder: string;

    @IsString()
    @Matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: 'Expiry must be in MM/YY format.' })
    readonly expiry: string;

    @IsString()
    @Matches(/^[0-9]{3}$/, { message: 'CVV must contain exactly 3 digits.' })
    readonly cvv: string;

    @IsNumber()
    @Min(0.01, { message: 'Amount must be at least 0.01.' })
    @Max(10000, { message: 'Amount must not exceed 10,000.' })
    readonly amount: number;
}
