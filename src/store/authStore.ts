import { getAuth, onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";

const AuthStore = writable(null);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        AuthStore.set(user);
    } else {
        AuthStore.set(null);
    }
});

export default AuthStore;
