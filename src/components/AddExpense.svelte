<script>
    import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
    import Button from "../shared/Button.svelte";
    import Modal from "../shared/Modal.svelte";
    import ExpenseDetailStore from "../store/expenseDetailStore";
    import ModalStore from "../store/modalStore";
    import Swal from "sweetalert2";

    export let isEdit = false;

    function validateForm() {
        let errors = [];

        if (!$ExpenseDetailStore.date) errors.push("date cannot be invalid");
        if (!$ExpenseDetailStore.name) errors.push("description cannot be empty");
        if (!$ExpenseDetailStore.total) errors.push("total cannot be 0");

        if (errors.length > 0) {
            let errorMessage = "";
            errors.forEach((err) => (errorMessage += `<li>${err}</li>`));
            Swal.fire({ html: `<ul class='bg-red-500 p-2 rounded-md text-white'>${errorMessage}<div>`, icon: "error" });
        }

        return errors.length == 0;
    }

    async function addExpense() {
        if (!validateForm()) return;

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
        if (!validateForm()) return;

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
                <input bind:value={$ExpenseDetailStore.date} type="date" class="input" />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="name">Description: </label>
                <textarea bind:value={$ExpenseDetailStore.name} id="name" class="input resize-none" rows="5" />
            </div>
            <div class="flex flex-col space-y-2">
                <label for="total">Total: </label>
                <input bind:value={$ExpenseDetailStore.total} type="number" id="total" class="input" />
            </div>
        </div>
        <Button classes="mt-8 bg-green-500 hover:bg-green-600">Save</Button>
    </form>
</Modal>
