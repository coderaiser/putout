export default defineConfig({
  test: {
    browser: {
      name: 'chromium', 
      providerOptions: { 
        launch: { devtools: true }, 
      }, 
    }
  }
});