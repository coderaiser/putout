'use strict';

const visit = require('unist-util-visit');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const preset = require('remark-preset-lint-consistent');
const jsonProcessor = require('@putout/processor-json');

const {initParseStore} = require('./parse-store');

const parseStore = initParseStore(parse);

const text = ({value}) => value;
const stringifyOptions = {
    bullet: '-',
    listItemIndent: 'one',
    fences: true,
    tightDefinitions: true,
    handlers: {
        text,
    },
};

module.exports.files = [
    '*.md',
];

module.exports.process = async (rawSource) => {
    parseStore.init();
    
    const {messages} = await unified()
        .use(parseStore)
        .use(preset)
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    return [
        rawSource,
        messages.map(toPlace),
    ];
};

module.exports.preProcess = async (rawSource) => {
    const list = [];
    
    await unified()
        .use(parseStore)
        .use(collect, list)
        .use(stringify)
        .process(rawSource);
    
    return list;
};

module.exports.postProcess = async (rawSource, list) => {
    const newList = list.slice();
    
    const {contents} = await unified()
        .use(parseStore)
        .use(apply, newList, rawSource)
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    parseStore.clear();
    
    return contents;
};

function toPlace({reason, line, column, source, ruleId}) {
    return {
        message: reason,
        rule: `${ruleId} (${source})`,
        position: {
            line,
            column,
        },
    };
}

const collect = (list) => (node) => {
    visit(node, 'code', (node) => {
        const {lang, value} = node;
        const startLine = node.position.start.line;
        
        if (/^(js|javascript)$/.test(lang)) {
            list.push({
                startLine,
                source: value,
                extension: 'js',
            });
            
            return;
        }
        
        if (/^(ts|typescript)$/.test(lang)) {
            list.push({
                startLine,
                source: value,
                extension: 'ts',
            });
            
            return;
        }
        
        if (lang === 'json') {
            const [{source}] = jsonProcessor.preProcess(value);
            
            list.push({
                startLine,
                source,
                extension: 'json',
            });
        }
    });
};

const apply = (list, rawSource) => (node) => {
    visit(node, 'code', (node) => {
        const {lang} = node;
        
        if (/^(js|javascript)$/.test(lang)) {
            const source = list.shift();
            
            node.value = source;
            return;
        }
        
        if (/^(ts|typescript)$/.test(lang)) {
            const source = list.shift();
            
            node.value = source;
            return;
        }
        
        if (lang === 'json') {
            const code = list.shift();
            const source = jsonProcessor.postProcess(rawSource, [code]);
            
            node.value = source;
        }
    });
};

