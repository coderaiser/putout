 const [error] = tryCatch(execSync, cmd, {
    stdio: [0, 1, 2],
    env: {
        ...fn(),
       // ZENLOAD: 'escover,mock-import',
    },
});
