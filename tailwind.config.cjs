const config = {
    content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],

    theme: {
        extend: {
            colors: {
                lightBlue: "#6e86cc",
                mediumBlue: "#586ba3",
                blue: "#42507a",
                darkBlue: "#2c3652",
                deepBlue: "#161b29",
            },
        },
    },

    plugins: [require("flowbite/plugin")],
    darkMode: "class",
};

module.exports = config;
