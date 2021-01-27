'use strict';

const {initParseStore} = require('./parse-store');

const parseStore = initParseStore();

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

module.exports.process = async (rawSource, {fix}) => {
    const unified = require('unified');
    const stringify = require('remark-stringify');
    const preset = require('remark-preset-lint-consistent');
    
    parseStore.init();
    
    const {messages, contents} = await unified()
        .use(parseStore)
        .use(preset)
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    if (fix && contents !== rawSource && messages.length)
        return [
            contents,
            [],
        ];
    
    return [
        rawSource,
        messages.map(toPlace),
    ];
};

module.exports.preProcess = async (rawSource) => {
    const unified = require('unified');
    const stringify = require('remark-stringify');
    const list = [];
    
    await unified()
        .use(parseStore)
        .use(collect, list)
        .use(stringify)
        .process(rawSource);
    
    return list;
};

module.exports.postProcess = async (rawSource, list) => {
    const unified = require('unified');
    const stringify = require('remark-stringify');
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

const collect = (list) => {
    const jsonProcessor = require('@putout/processor-json');
    const visit = require('unist-util-visit');
    
    return (node) => {
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
};

const apply = (list, rawSource) => (node) => {
    const jsonProcessor = require('@putout/processor-json');
    const visit = require('unist-util-visit');
    
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

