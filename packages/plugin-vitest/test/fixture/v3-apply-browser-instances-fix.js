export default defineConfig({
    test: {
        browser: {
            instances: [{
                instances: [{
                    name: 'chromium',
                    providerOptions: {
                        launch: {
                            devtools: true,
                        },
                    },
                }],
            }],
        },
    },
});
