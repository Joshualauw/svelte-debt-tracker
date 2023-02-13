<script>
    export let classes = "";
</script>

<button class="bg-blue hover:bg-lightBlue px-3 py-2 rounded-md text-white mr-2 {classes}" on:click>
    <slot />
</button>
