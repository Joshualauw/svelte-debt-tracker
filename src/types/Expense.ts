export interface Expense {
    id: string;
    name: string;
    date: string;
    total: number;
    loan?: boolean;
    payedAt?: string;
}
