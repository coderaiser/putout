import tryCatch from 'try-catch';
const [error] = tryCatch(log, a, b, c);

if (error) {
    console.log(error);
}

try {
} catch {
}

try {
    a();
    b();
} catch {
}

