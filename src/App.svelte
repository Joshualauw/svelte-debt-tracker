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
    import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
    import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
    import { doc, getFirestore, updateDoc } from "firebase/firestore";
    import AuthStore from "./store/authStore";
    import Login from "./components/Login.svelte";
    import LoadingStore from "./store/loadingStore";
    import Loading from "./shared/Loading.svelte";
    import thousandSeparator from "./utils/thousandSeparator";

    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);

    let startDate = dayjs().format("YYYY-MM-DD");
    let endDate = dayjs().format("YYYY-MM-DD");

    let all = false;
    let isEdit = false;

    $: expenses = $ExpenseStore
        .filter((exp) => (dayjs(exp.date).isSameOrAfter(startDate) && dayjs(exp.date).isSameOrBefore(endDate)) || all)
        .sort((a, b) => (dayjs(a.date) > dayjs(b.date) ? 1 : -1));

    $: total = expenses.reduce((a, b) => a + (!b.loan || (b.loan && b.payedAt) ? b.total : 0), 0);

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
    {#if $LoadingStore}
        <Loading />
    {:else if !$AuthStore}
        <Login />
    {:else}
        <div class="w-full flex flex-col md:flex-row items-center justify-between">
            <Button on:click={onAddExpense}><i class="fa-solid fa-plus h-5 mr-1 " /> Add Expense</Button>
            <p class="text-lg text-green-400 font-bold mt-3 md:mt-0">Total: Rp. {thousandSeparator(total)}</p>
            <div class="space-x-2 mt-3 md:mt-0">
                <div class="flex space-x-3 items-center">
                    <input bind:value={startDate} type="date" class="input" />
                    <span>to</span>
                    <input bind:value={endDate} type="date" class="input" />
                </div>
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
