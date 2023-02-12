import { getAuth, onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import LoadingStore from "./loadingStore";

const AuthStore = writable(null);

const auth = getAuth();

LoadingStore.set(true);
onAuthStateChanged(auth, (user) => {
    if (user) {
        AuthStore.set(user);
    } else {
        AuthStore.set(null);
    }
    LoadingStore.set(false);
});

export default AuthStore;
