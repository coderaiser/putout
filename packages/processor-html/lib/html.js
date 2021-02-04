'use strict';

const processorCSS = require('@putout/processor-css');

const createSpaceLine = (a) => Array(a).join(' ');
const addSpaces = (spacesCount) => (a) => createSpaceLine(spacesCount) + a;
const cutSpaces = (spacesCount) => (a) => a.slice(spacesCount);

module.exports.files = [
    '*.html',
];

module.exports.process = async (rawSource, {fix}) => {
    const svelte = require('svelte/compiler');
    const allPlaces = [];
    
    const {code} = await svelte.preprocess(rawSource, {
        async style(node) {
            console.log(node);
            const {content} = node;
            const source = removePrefixSpaces(content);
            const [processedSource, places] = await processorCSS.process(source, {fix});
            const code = addPrefixSpaces({
                content,
                source: processedSource.slice(0, -1),
            });
            
            for (const place of places) {
            }
            
            allPlaces.push(...places);
            
            return {
                code,
            };
        },
    });
    
    debugger;
    if (!fix)
        return [rawSource, allPlaces];
    
    return [code, []];
};

module.exports.preProcess = async (rawSource) => {
    const svelte = require('svelte/compiler');
    
    const list = [];
    const ast = svelte.parse(rawSource);
    
    svelte.walk(ast, {
        enter(node) {
            const {name, children} = node;
            
            if (name === 'script') {
                const {data, start} = children[0];
                const startLine = convertStartToLine(start, rawSource);
                const source = removePrefixSpaces(data);
                
                list.push({
                    startLine,
                    source,
                    extension: 'js',
                });
            }
        },
    });
    
    return list;
};

module.exports.postProcess = async (rawSource, list) => {
    const svelte = require('svelte/compiler');
    
    const {code} = await svelte.preprocess(rawSource, {
        script({content}) {
            const currentSource = list.shift().trim();
            const code = addPrefixSpaces({
                content,
                source: currentSource,
            });
            
            return {
                code,
            };
        },
    });
    
    return code;
};

function addPrefixSpaces({content, source}) {
    const spacesCount = getSpacesCount(content);
    const lastLine = content.split('\n').pop();
    const code = '\n' + source
        .split('\n')
        .map(addSpaces(spacesCount))
        .join('\n') + '\n' + lastLine;
    
    return code;
}

function convertStartToLine(start, str) {
    let newLines = 4;
    
    for (let i = 0; i <= start; i++) {
        if (str[i] === '\n')
            ++newLines;
    }
    
    return newLines;
}

function removePrefixSpaces(text) {
    const lines = text
        .split('\n')
        .slice(1);
    
    const spacesCount = getSpacesCount(lines[0]);
    
    return lines
        .map(cutSpaces(spacesCount))
        .join('\n');
}

function getSpacesCount(text) {
    let i = 0;
    
    while(/\s/.test(text[i]))
        ++i;
    
    return i;
};

