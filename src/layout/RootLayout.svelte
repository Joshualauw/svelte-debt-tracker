<script>
    import Navbar from "../components/Navbar.svelte";
</script>

<div class="mx-auto min-h-screen bg-deepBlue text-white">
    <Navbar />
    <div class="px-8 md:px-16">
        <slot />
    </div>
</div>
