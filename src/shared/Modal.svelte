<!-- svelte-ignore a11y-click-events-have-key-events -->
<script>
    import ModalStore from "../store/modalStore";

    function closeModal() {
        ModalStore.set("");
    }
</script>

{#if $ModalStore}
    <div on:click|self={closeModal} class="fixed w-full h-full bg-[rgba(0,0,0,0.3)] top-0 left-0 text-gray-200 px-8">
        <div
            class="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/3 overflow-auto p-8 rounded-lg bg-deepBlue shadow-md"
        >
            <slot name="header"><h1 class="text-lg font-semibold">Title</h1></slot>
            <hr class="mt-3" />
            <slot />
            <button class="absolute top-2 right-4 text-red-400 font-semibold text-xl" on:click|self={closeModal}>x</button>
        </div>
    </div>
{/if}
