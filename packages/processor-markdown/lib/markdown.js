'use strict';

const processorCSS = require('@putout/processor-css');

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
    
    const places = [];
    const {messages, contents} = await unified()
        .use(parseStore)
        .use(preset)
        .use(process, {places, fix})
        .use(stringify, stringifyOptions)
        .process(rawSource);
    
    console.log('::::', places);
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
    const processorJSON = require('@putout/processor-json');
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
                const [{source}] = processorJSON.preProcess(value);
                
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

function process({places, fix}) {
    const processorCSS = require('@putout/processor-css');
    const visit = require('unist-util-visit');
    console.log(this);
    
    return (node) => {
        visit(node, 'code', async (node) => {
            const {lang, value} = node;
            const startLine = node.position.start.line;
            
            if (/^css$/.test(lang)) {
                console.log('xxx', value);
                debugger;
                const [code, currentPlaces] = await processorCSS.process(value);
                console.log('zzzz', code, places);
                
                places.push(...currentPlaces);
                
                node.value = code;
                return;
            }
        });
    };
};
