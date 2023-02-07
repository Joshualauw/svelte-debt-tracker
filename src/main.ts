import "./main.css";
import "./firebase";
import "flowbite/dist/flowbite";
import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app"),
});

export default app;
