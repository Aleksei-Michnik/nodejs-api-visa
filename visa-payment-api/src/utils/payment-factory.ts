import { PaymentService} from '../services/payment.service';

export const paymentFactory = async (
    paymentService: PaymentService
): Promise<void> => {
    const isValidResponse = (response: any): boolean => {
        if (!response || !Array.isArray(response.results) || response.results.length === 0)
            return false;
        const isValidUser = (user: any) =>
            user &&
            typeof user.name === 'object' &&
            typeof user.name.first === 'string' &&
            typeof user.name.last === 'string';
        return response.results.every(isValidUser);
    };

    const isValidName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Z\s\-]+$/;
        if (!nameRegex.test(name)) {
            console.log(`Invalid name: ${name}`);
            return false;
        }
        return true;
    };

    const generateRandomAmount = (): number => {
        return parseFloat((Math.random() * 1999 + 1).toFixed(2)); // number 1 - 2000
    };

    const namesCache: string[] = [];

    const fetchName = async (): Promise<string> => {
        if (namesCache.length !== 0)
            return namesCache.pop() || 'Random User';
        const maxRetries = 5;
        let retryDelay = 1000;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                const response = await paymentService.httpClient.get(
                    'https://randomuser.me/api/?results=10&inc=name&nat=gb,us'
                );
                if (!isValidResponse(response)) {
                    console.error('Invalid API response structure:', response);
                    throw new Error('Invalid API response structure');
                }
                const users = response.results
                    .map((user: any) => `${user.name.first} ${user.name.last}`)
                    .filter((name: string) => isValidName(name));
                namesCache.push(...users);
                return namesCache.pop() || 'Random User';
            } catch (err) {
                console.error('Error fetching user data:', err.message);
            }
            retries++;
            console.log(`Retrying fetchName in ${retryDelay}ms... (${retries}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            retryDelay *= 2;
        }
        console.warn('All fetchName retries exhausted. Returning fallback name');
        return 'Random User';
    };

    const generateCardNumber = (): string => {
        return Array(4)
            .fill(null)
            .map(() => Math.floor(1000 + Math.random() * 9000)) // 4 groups of 4 digits
            .join('');
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
