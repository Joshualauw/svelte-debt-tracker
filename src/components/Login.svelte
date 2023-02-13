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

<h1 class="text-xl mt-5 font-semibold text-center">Login</h1>
<form on:submit|preventDefault={login} class="flex flex-col w-full md:w-2/5 mx-auto items-center">
    <div class="space-y-4 w-full mb-8">
        <div class="flex flex-col space-y-2">
            <label for="email">Email:</label>
            <input bind:value={email} type="email" id="email" class="input bg-slate-100" />
        </div>
        <div class="flex flex-col space-y-2">
            <label for="password">Password:</label>
            <input bind:value={password} type="password" id="password" class="input bg-slate-100" />
        </div>
    </div>
    <Button wide>Login</Button>
</form>
