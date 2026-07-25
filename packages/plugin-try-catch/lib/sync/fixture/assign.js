let error;

try {
    validatePlugin({
        fix: `SELECT id FROM Foo WHERE file = :file`,
    });
} catch(e) {
    error = e;
}

