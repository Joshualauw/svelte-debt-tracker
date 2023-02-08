<script>
    import RootLayout from "./layout/RootLayout.svelte";
    import Button from "./shared/Button.svelte";
    import Card from "./shared/Card.svelte";
    import ExpenseItem from "./components/ExpenseItem.svelte";
    import AddExpense from "./components/AddExpense.svelte";
    import ModalStore from "./store/modalStore";
    import DeleteExpense from "./components/DeleteExpense.svelte";
    import ExpenseDetailStore from "./store/expenseDetailStore";
    import ExpenseStore from "./store/expenseStore";
    import dayjs from "dayjs";
    import { doc, getFirestore, updateDoc } from "firebase/firestore";
    import AuthStore from "./store/authStore";
    import Login from "./components/Login.svelte";

    const months = [
        { value: 1, name: "January" },
        { value: 2, name: "February" },
        { value: 3, name: "March" },
        { value: 4, name: "April" },
        { value: 5, name: "May" },
        { value: 6, name: "June" },
        { value: 7, name: "July" },
        { value: 8, name: "August" },
        { value: 9, name: "September" },
        { value: 10, name: "October" },
        { value: 11, name: "November" },
        { value: 12, name: "Desember" },
    ];

    let currentYear = new Date().getFullYear();
    let currentMonth = months[new Date().getMonth()].value;
    let all = false;
    let isEdit = false;

    $: expenses = $ExpenseStore.filter(
        (exp) => (dayjs(exp.date).year() == currentYear && dayjs(exp.date).month() == currentMonth - 1) || all
    );

    async function onLoanChanged(e, id) {
        try {
            const expenseRef = doc(getFirestore(), "expenses", id);
            await updateDoc(expenseRef, { loan: e.detail });
        } catch (e) {
            console.log(e);
        }
    }

    async function onLoadPayed(e, id) {
        try {
            const expenseRef = doc(getFirestore(), "expenses", id);
            await updateDoc(expenseRef, { payedAt: e.detail });
        } catch (e) {
            console.log(e);
        }
    }

    function onAddExpense() {
        ExpenseDetailStore.set({
            id: "",
            date: "",
            name: "",
            total: 0,
        });
        isEdit = false;
        ModalStore.set("addExpense");
    }
</script>

<RootLayout>
    {#if !$AuthStore}
        <Login />
    {:else}
        <div class="w-full flex flex-col md:flex-row items-center justify-between">
            <Button on:click={onAddExpense}><i class="fa-solid fa-plus h-5 mr-1 " /> Add Expense</Button>
            <div class="space-x-2 mt-3 md:mt-0">
                <select bind:value={currentMonth} class="rounded-md py-1 px-3 text-black">
                    {#each months as m}
                        <option value={m.value}>{m.name}</option>
                    {/each}
                </select>
                <input bind:value={currentYear} type="text" class="rounded-md py-1 px-3 text-black w-20" />
                <input bind:checked={all} type="checkbox" class="rounded-sm" /><span>All</span>
            </div>
        </div>

        {#if $ExpenseStore.length == 0}
            <h1 class="text-2xl mt-12 text-center text-gray-400 font-semibold">No expense yet</h1>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-3 mt-8 gap-8">
            {#each expenses as exp}
                <Card>
                    <ExpenseItem
                        on:loanChanged={(e) => onLoanChanged(e, exp.id)}
                        on:loanPayed={(e) => onLoadPayed(e, exp.id)}
                        on:editing={() => (isEdit = true)}
                        id={exp.id}
                        date={exp.date}
                        name={exp.name}
                        total={exp.total}
                        loan={exp.loan}
                        payedAt={exp.payedAt}
                    />
                </Card>
            {/each}
        </div>

        {#if $ModalStore == "addExpense"}
            <AddExpense {isEdit} />
        {:else if $ModalStore == "deleteExpense"}
            <DeleteExpense />
        {/if}
    {/if}
</RootLayout>
