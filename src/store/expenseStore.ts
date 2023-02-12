import { writable, type Writable } from "svelte/store";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import type { Expense } from "../types/Expense";
import LoadingStore from "./loadingStore";

const ExpenseStore: Writable<Expense[]> = writable([]);

const expenseRef = collection(getFirestore(), "expenses");
LoadingStore.set(true);
onSnapshot(expenseRef, (docs) => {
    console.log("berubah");
    let expenses: Expense[] = [];
    docs.forEach((doc) => {
        expenses.push({ id: doc.id, ...(doc.data() as any) });
    });
    ExpenseStore.set(expenses);
    LoadingStore.set(false);
});

export default ExpenseStore;
