<script>
    export let classes = "";
</script>

<button class="bg-darkBlue hover:bg-blue px-3 py-1.5 rounded-md text-white mr-2 {classes}" on:click>
    <slot />
</button>
