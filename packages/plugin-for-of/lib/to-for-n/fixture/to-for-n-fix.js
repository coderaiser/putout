{
    const n = tokens.length;
    for (let i = 0; i < n; i++) {
        ++i;
    }
}
function fn() {
    const n = 2;
    
    for (let i = 0; i < tokens.length; i++) {
        ++i;
    }
}

function fnNoViolations() {
    for (let [i, token] of tokens.entries()) {}
}
