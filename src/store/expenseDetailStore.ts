import { writable, type Writable } from "svelte/store";
import type { Expense } from "../types/Expense";

const ExpenseDetailStore: Writable<Expense> = writable({
    id: "",
    name: "",
    date: "",
    total: 0,
    loan: false,
});

export default ExpenseDetailStore;
