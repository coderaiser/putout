 const [error] = tryCatch(execSync, cmd, {
    stdio: [0, 1, 2],
    env: {
        ...process.env,
       // ZENLOAD: 'escover,mock-import',
    },
});
