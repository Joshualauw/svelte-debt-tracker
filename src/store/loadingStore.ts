import { writable } from "svelte/store";

const LoadingStore = writable(false);

export default LoadingStore;
