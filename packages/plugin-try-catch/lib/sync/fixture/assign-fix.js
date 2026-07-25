const [error] = tryCatch(validatePlugin, {
    fix: `SELECT id FROM Foo WHERE file = :file`,
});
