<script>
    export let classes = "";
    export let wide = false;
</script>

<button class="bg-blue hover:bg-lightBlue px-3 py-2 w-full rounded-md text-white mr-2 {wide ? 'w-full' : 'w-fit'} {classes}" on:click>
    <slot />
</button>
