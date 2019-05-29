function getDOM({
    link = 'hello',
} = {}) {
}

const DOM = getDOM();

function fillTemplate(error, template) {
    return template;
}

const assignment = 1;
function objectPatternExample({a = assignment}) {
}

function objectPattern2({a, b}) {
    return b;
}

objectPattern2({b: 1});

