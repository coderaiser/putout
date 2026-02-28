const [err] = await tryToCatch(outputReport, argv);

if (err) {
    console.error(err.stack);
    return 1;
}

return process.exitCode;
