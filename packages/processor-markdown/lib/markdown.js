'use strict';

const visit = require('unist-util-visit');
const unified = require('unified');
const markdown = require('remark-parse');
const stringify = require('remark-stringify');
const remark = require('remark');
const preset = require('remark-preset-lint-consistent');

const jsonProcessor = require('@putout/processor-json');

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

module.exports.preProcess = (rawSource) => {
    const list = [];
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
            
            if (/^json$/.test(lang)) {
                const [{source}] = jsonProcessor.preProcess(value);
                
                list.push({
                    startLine,
                    source,
                    extension: 'json',
                });
            }
        });
    };
    
    unified()
        .use(markdown)
        .use(collect, list)
        .use(stringify)
        .processSync(rawSource);
    
    return list;
};

module.exports.process = (rawSource) => {
    const {messages, contents} = remark()
        .use(preset)
        .use({
            settings: stringifyOptions,
        })
        .processSync(rawSource);
    
    return [
        contents,
        messages.map(toPlace),
    ];
};

module.exports.postProcess = (rawSource, list) => {
    const newList = list.slice();
    const apply = (list) => (node) => {
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
            
            if (/^json$/.test(lang)) {
                const code = list.shift();
                const source = jsonProcessor.postProcess(rawSource, [code]);
                
                node.value = source;
            }
        });
    };
    
    const {contents} = unified()
        .use(markdown)
        .use(apply, newList)
        .use(stringify, stringifyOptions)
        .processSync(rawSource);
    
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
