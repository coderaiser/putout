function fn() {
    const stack = `
        ReferenceError: s is not defined
        at eval (eval at module.exports (get-user-menu.js:NaN), <anonymous>:1:2)
        at module.exports (get-user-menu.js:6)
        at tryCatch (VM12611 try-catch.js:7)
        at AsyncFunction.show (index.js:67)
    `;
}
