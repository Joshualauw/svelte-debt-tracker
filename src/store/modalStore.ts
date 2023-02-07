import { writable } from "svelte/store";

const ModalStore = writable("" as string);

export default ModalStore;
