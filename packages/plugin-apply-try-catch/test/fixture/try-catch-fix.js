import tryCatch from 'try-catch';
const [error] = tryCatch(log, a, b, c);

try {
} catch {
}

try {
    a();
    b();
} catch {
}

