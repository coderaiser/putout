export default defineConfig({
    test: {
        browser: {
            instances: [{
                name: 'chromium',
                providerOptions: {
                    launch: {
                        devtools: true,
                    },
                },
            }],
        },
    },
});
