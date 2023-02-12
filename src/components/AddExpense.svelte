<script>
    import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
    import Button from "../shared/Button.svelte";
    import Modal from "../shared/Modal.svelte";
    import ExpenseDetailStore from "../store/expenseDetailStore";
    import ModalStore from "../store/modalStore";
    import Swal from "sweetalert2";

    export let isEdit = false;

    async function addExpense() {
        try {
            const expenseRef = collection(getFirestore(), "expenses");
            await addDoc(expenseRef, {
                date: $ExpenseDetailStore.date,
                name: $ExpenseDetailStore.name,
                total: $ExpenseDetailStore.total,
                loan: false,
                payedAt: null,
            });
            Swal.fire({ title: "expense added successfully", icon: "success" });
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "failed to add expense", icon: "error" });
        } finally {
            ModalStore.set("");
        }
    }

    async function editExpense() {
        try {
            const expenseRef = doc(getFirestore(), "expenses", $ExpenseDetailStore.id);
            await updateDoc(expenseRef, {
                date: $ExpenseDetailStore.date,
                name: $ExpenseDetailStore.name,
                total: $ExpenseDetailStore.total,
            });
            Swal.fire({ title: "expense updated successfully", icon: "success" });
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "failed to update expense", icon: "error" });
        } finally {
            ModalStore.set("");
        }
    }
</script>

<Modal>
    <div slot="header"><h1 class="text-xl text-slate-100 font-semibold">{isEdit ? "Edit" : "Add"} Expense</h1></div>
    <form on:submit|preventDefault={isEdit ? editExpense : addExpense} class="flex flex-col p-5">
        <div class="space-y-4">
            <div class="flex flex-col space-y-2">
                <label for="date">Expense date: </label>
                <input bind:value={$ExpenseDetailStore.date} type="date" class="input bg-slate-100" />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="name">Name: </label>
                <input bind:value={$ExpenseDetailStore.name} type="text" id="name" class="input bg-slate-100" />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="total">Total: </label>
                <input bind:value={$ExpenseDetailStore.total} type="number" id="total" class="input bg-slate-100" />
            </div>
        </div>
        <Button classes="mt-8 bg-green-500 hover:bg-green-600">Save</Button>
    </form>
</Modal>
