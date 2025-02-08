import { PaymentService} from '../services/payment.service';

export const paymentFactory = async (
    paymentService: PaymentService
): Promise<void> => {
    const generateRandomAmount = (): number => {
        return parseFloat((Math.random() * 1999 + 1).toFixed(2)); // number 1 - 2000
    };

    const namesCache: string[] = [];

    const fetchName = async (): Promise<string> => {
        if (namesCache.length !== 0)
            return namesCache.pop() || 'John Doe';
        try {
            const response = await paymentService.httpClient.get(
                'https://randomuser.me/api/?results=10&inc=name&nat=gb,us'
            );
            const users = response.results.map(
                (user: any) => `${user.name.first} ${user.name.last}`
            );
            namesCache.push(...users);
        } catch (err) {
            console.error('Error fetching user data:', err.message);
            return 'Random User';
        }
        return namesCache.pop() || 'John Doe';
    };

    const generateCardNumber = (): string => {
        return Array(4)
            .fill(null)
            .map(() => Math.floor(1000 + Math.random() * 9000)) // 4 groups of 4 digits
            .join(' ');
    };

    const generateCVV = (): string => {
        return Math.floor(100 + Math.random() * 900).toString(); //  3-digit number
    };

    const generateExpiry = (): string => {
        const month = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
        const year = (new Date().getFullYear() + Math.floor(Math.random() * 5) % 100)
            .toString()
            .slice(-2);
        return `${month}/${year}`;
    };

    const payment = {
        amount: generateRandomAmount(),
        cardNumber: generateCardNumber(),
        cardHolder: await fetchName(),
        expiry: generateExpiry(),
        cvv: generateCVV(),
    };

    try {
        await paymentService.processPayment(payment);
    } catch (err) {
        console.error('Error processing payment:', err.message);
    }
};
