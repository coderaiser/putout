try {
    await outputReport(argv);
    return process.exitCode;
} catch(err) {
    console.error(err.stack);
    return 1;
}