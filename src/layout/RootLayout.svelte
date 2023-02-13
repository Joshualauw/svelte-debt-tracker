<script>
    import Navbar from "../components/Navbar.svelte";
</script>

<div class="mx-auto min-h-screen bg-deepBlue text-white">
    <Navbar on:add />
    <div class="px-6 md:px-16">
        <slot />
    </div>
</div>
