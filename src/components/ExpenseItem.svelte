<script>
    import { createEventDispatcher } from "svelte";
    import Button from "../shared/Button.svelte";
    import ExpenseDetailStore from "../store/expenseDetailStore";
    import ModalStore from "../store/modalStore";
    import dayjs from "dayjs";

    const dispatch = createEventDispatcher();

    export let id = "";
    export let date = "";
    export let name = "";
    export let total = 0;
    export let loan = false;
    export let payedAt = "";

    $: payedStatus = payedAt ? "payed" : "not-payed";

    function thousandSeparator(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
        return x;
    }

    $: dispatch("loanChanged", loan);
    $: dispatch("loanPayed", payedAt);

    function setExpenseDetail() {
        ExpenseDetailStore.set({
            id,
            date,
            name,
            total,
        });
    }

    function openEditExpense() {
        setExpenseDetail();
        dispatch("editing");
        ModalStore.set("addExpense");
    }

    function openDeleteExpense() {
        setExpenseDetail();
        ModalStore.set("deleteExpense");
    }
</script>

<div class=" relative group h-[200px]">
    <div class="space-y-2">
        <p class="font-semibold text-lg">{dayjs(date).format("DD MMM YYYY")}</p>
        <p class="text-gray-300">{name}</p>
        <p class="text-green-500 font-bold text-xl ">Rp. {thousandSeparator(total)}</p>
    </div>
    <div class="flex justify-between items-center mt-6">
        <div class="flex space-x-2 items-center">
            <input bind:checked={loan} type="checkbox" class="rounded-md w-5 h-5" /> <span>mark as loan</span>
        </div>
        {#if loan}
            <p class="font-semibold {payedAt ? 'text-green-500' : 'text-red-400'}">Status: {payedStatus}</p>
        {/if}
    </div>
    {#if loan}
        <input bind:value={payedAt} type="date" class="rounded-md p-2 bg-blue mt-3 w-full text-white border-none" />
    {/if}
    <div class="hidden group-hover:flex absolute top-0 right-0">
        <Button on:click={openEditExpense} classes="text-amber-500"><i class="fa-solid fa-pen-to-square" /></Button>
        <Button on:click={openDeleteExpense} classes="text-red-500"><i class="fa-solid fa-trash-can" /></Button>
    </div>
</div>
