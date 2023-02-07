import { writable, type Writable } from "svelte/store";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import type { Expense } from "../types/Expense";

const ExpenseStore: Writable<Expense[]> = writable([]);

const expenseRef = collection(getFirestore(), "expenses");
onSnapshot(expenseRef, (docs) => {
    let expenses: Expense[] = [];
    docs.forEach((doc) => {
        expenses.push({ id: doc.id, ...(doc.data() as any) });
    });
    ExpenseStore.set(expenses);
});

export default ExpenseStore;
