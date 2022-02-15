'use strict';

const {readFileSync} = require('fs');

const once = require('once');
const {sync: findUpSync} = require('find-up');

const {parse} = JSON;
const NAME = '.putout.replace.json';

module.exports.files = [
    `*`,
];

const read = once(() => {
    const name = findUpSync(NAME);
    
    if (!name)
        return {};
    
    return parse(readFileSync(name, 'utf8'));
});

module.exports.find = (rawSource) => {
    const replaces = read();
    const places = [];
    
    for (const [from, to] of Object.entries(replaces)) {
        const index = rawSource.indexOf(from);
        const found = ~index;
        
        if (!found)
            continue;
        
        places.push(parsePlace({
            from,
            to,
            index,
            rawSource,
        }));
    }
    
    return places;
};

module.exports.fix = (rawSource) => {
    const replaces = read();
    
    for (const [from, to] of Object.entries(replaces))
        rawSource = rawSource.replace(RegExp(from, 'g'), to);
    
    return rawSource;
};

module.exports.merge = (processedSource, list) => list[0];

function parsePlace({from, to, index, rawSource}) {
    const place = {
        rule: 'replace (replace)',
        message: `${from} -> ${to}`,
        position: parsePosition({
            index,
            rawSource,
        }),
    };
    
    return place;
}

function parsePosition({index, rawSource}) {
    let line = 1;
    let lastLineStart = 0;
    
    for (let i = 0; i <= index; i++) {
        if (rawSource[i] === '\n') {
            ++line;
            lastLineStart = i;
        }
    }
    
    return {
        line,
        column: index - lastLineStart,
    };
}

