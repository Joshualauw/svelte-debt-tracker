<script>
    import { getAuth, signOut } from "firebase/auth";
    import { createEventDispatcher } from "svelte";
    import Swal from "sweetalert2";
    import Button from "../shared/Button.svelte";
    import ExpenseDetailStore from "../store/expenseDetailStore";
    import ModalStore from "../store/modalStore";

    const dispatch = createEventDispatcher();

    async function logout() {
        try {
            await signOut(getAuth());
            Swal.fire({ title: "logout successful", icon: "success" });
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "logout failed", icon: "error" });
        }
    }

    function onAddExpense() {
        ExpenseDetailStore.set({
            id: "",
            date: "",
            name: "",
            total: 0,
        });
        dispatch("add");
        ModalStore.set("addExpense");
    }
</script>

<div class="bg-darkBlue shadow-lg flex justify-between items-center px-6 md:px-16 py-4">
    <div class="flex items-center space-x-3">
        <img src="/gold_coin.svg" class="rounded-full w-7 h-7" alt="" />
        <h1 class="text-2xl font-semibold">Expense Tracker</h1>
    </div>
    <div>
        <Button on:click={onAddExpense}>
            <i class="fa-solid fa-plus h-5" />
            <span class="hidden md:inline md:ml-1">Add Expense</span>
        </Button>
        <Button on:click={logout}>
            <i class="fa-solid fa-right-from-bracket w-4 h-4" />
            <span class="hidden md:inline md:ml-1">Logout</span>
        </Button>
    </div>
</div>
