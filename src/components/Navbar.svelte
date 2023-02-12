<script>
    import { getAuth, signOut } from "firebase/auth";
    import Swal from "sweetalert2";
    import Button from "../shared/Button.svelte";

    async function logout() {
        try {
            await signOut(getAuth());
            Swal.fire({ title: "logout successful", icon: "success" });
        } catch (e) {
            console.log(e);
            Swal.fire({ title: "logout failed", icon: "error" });
        }
    }
</script>

<div class="bg-darkBlue shadow-lg flex justify-between items-center p-5 mb-8">
    <div class="flex items-center space-x-3">
        <img src="/gold_coin.svg" class="rounded-full w-7 h-7" alt="" />
        <h1 class="text-2xl font-semibold">Expense Tracker</h1>
    </div>
    <Button on:click={logout}>Logout</Button>
</div>
