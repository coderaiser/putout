const [error] = await tryToCatch(log, a, b, c);

try {
} catch {
}

try {
    a();
    b();
} catch {
}

