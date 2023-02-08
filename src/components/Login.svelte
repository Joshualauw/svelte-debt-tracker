<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import Swal from "sweetalert2";
    import Button from "../shared/Button.svelte";

    let email;
    let password;

    function login() {
        if (email == import.meta.env.VITE_USER_EMAIL && password == import.meta.env.VITE_USER_PASSWORD) {
            signInWithEmailAndPassword(getAuth(), email, password);
            Swal.fire({ title: "login successful", icon: "success" });
        } else {
            Swal.fire({ title: "invalid credentials", icon: "error" });
        }
    }
</script>

<h1 class="text-xl">Login First</h1>
<form on:submit|preventDefault={login} class="flex flex-col p-5 w-1/2">
    <div class="space-y-4 mb-8">
        <div class="flex flex-col space-y-2">
            <label for="email">Email:</label>
            <input bind:value={email} type="email" id="email" class="rounded-md p-2 text-black bg-slate-100" />
        </div>
        <div class="flex flex-col space-y-2">
            <label for="password">Password:</label>
            <input bind:value={password} type="password" id="password" class="rounded-md p-2 text-black bg-slate-100" />
        </div>
    </div>
    <Button>Login</Button>
</form>
