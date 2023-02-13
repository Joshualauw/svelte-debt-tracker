<script>
    import { deleteDoc, doc, getFirestore } from "firebase/firestore";
    import Modal from "../shared/Modal.svelte";
    import ExpenseDetailStore from "../store/expenseDetailStore";
    import ModalStore from "../store/modalStore";
    import Swal from "sweetalert2";

    async function deleteExpense() {
        try {
            const expenseRef = doc(getFirestore(), "expenses", $ExpenseDetailStore.id);
            await deleteDoc(expenseRef);
            Swal.fire({ title: "expense deleted successfully", icon: "success" });
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "failed to delete expense", icon: "error" });
        } finally {
            ModalStore.set("");
        }
    }
</script>

<Modal>
    <div slot="header"><h1 class="text-xl font-semibold">Delete Expense</h1></div>
    <div class="mt-4">
        <div>Are you sure you want to delete <span class="font-semibold">{$ExpenseDetailStore.name}?</span></div>
        <button on:click={deleteExpense} class="py-1.5 px-3 rounded-md bg-red-400 text-white mt-8 w-full">Delete</button>
    </div>
</Modal>
