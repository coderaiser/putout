const [error] = tryCatch(log, a, b, c);
console.log(error);

try {
} catch {
}

try {
    a();
    b();
} catch {
}

