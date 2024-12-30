for (let [i, token] of tokens.entries()) {
    ++i;
}

function fn() {
    const n = 2;
    
    for (let [i, token] of tokens.entries()) {
        ++i;
    }
}

function fnNoViolations() {
    for (let [i, token] of tokens.entries()) {
    }
}