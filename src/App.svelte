<script>
    import RootLayout from "./layout/RootLayout.svelte";
    import Card from "./shared/Card.svelte";
    import ExpenseItem from "./components/ExpenseItem.svelte";
    import AddExpense from "./components/AddExpense.svelte";
    import ModalStore from "./store/modalStore";
    import DeleteExpense from "./components/DeleteExpense.svelte";
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
    let type = "all";

    $: expenses = $ExpenseStore
        .filter((exp) => (dayjs(exp.date).isSameOrAfter(startDate) && dayjs(exp.date).isSameOrBefore(endDate)) || all)
        .filter((exp) => (type == "expense" ? !exp.loan : type == "loan" ? exp.loan : 1))
        .sort((a, b) => (dayjs(a.date) > dayjs(b.date) ? 1 : -1));
    $: total = expenses.reduce((a, b) => a + (!b.loan ? b.total : b.loan && b.payedAt ? 0 : 0), 0);
    $: loanTotal = expenses.reduce((a, b) => a + (!b.loan ? 0 : b.loan && b.payedAt ? 0 : b.total), 0);

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
</script>

<RootLayout on:add={() => (isEdit = false)}>
    {#if $LoadingStore}
        <Loading />
    {:else if !$AuthStore}
        <Login />
    {:else}
        <div class="w-full flex flex-col md:flex-row items-center justify-between">
            <div class="mt-4 md:mt-0">
                <p class="text-lg text-green-400 font-bold">Expenses: Rp. {thousandSeparator(total)}</p>
                <p class="text-lg text-red-400 font-bold">Loans: Rp. {thousandSeparator(loanTotal)}</p>
            </div>
            <div class="space-x-2 mt-4 md:mt-0">
                <div class="flex space-x-3 items-center">
                    <input bind:value={startDate} type="date" class="input" />
                    <input bind:checked={all} type="checkbox" class="w-4 h-4 rounded-md" />
                    <input bind:value={endDate} type="date" class="input" />
                </div>
            </div>
            <select bind:value={type} class="input w-fit mt-4 md:mt-0">
                <option value="all">All</option>
                <option value="expense">Expense</option>
                <option value="loan">Loan</option>
            </select>
        </div>

        {#if $ExpenseStore.length == 0}
            <h1 class="text-2xl mt-12 text-center text-gray-400 font-semibold">No expense yet</h1>
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-12 gap-8">
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
