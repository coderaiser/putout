'use strict';

const visit = require('unist-util-visit');
const unified = require('unified');
const markdown = require('remark-parse');
const stringify = require('remark-stringify');

const text = ({value}) => value;

module.exports.extensions = [
    'md',
];

module.exports.preProcess = (rawSource) => {
    const list = [];
    const collect = (list) => (node) => {
        visit(node, 'code', (node) => {
            const {lang, value} = node;
            
            if (!/^(js|javascript|typescript)$/.test(lang))
                return;
            
            list.push({
                startLine: node.position.start.line,
                source: value,
            });
        });
    };
    
    unified()
        .use(markdown)
        .use(collect, list)
        .use(stringify)
        .processSync(rawSource);
    
    return list;
};

module.exports.postProcess = (rawSource, list) => {
    const newList = list.slice();
    const apply = (list) => (node) => {
        visit(node, 'code', (node) => {
            const {lang} = node;
            
            if (!/^(js|javascript|typescript)$/.test(lang))
                return;
            
            const source = list.shift();
            node.value = source;
        });
    };
    
    const {contents} = unified()
        .use(markdown)
        .use(apply, newList)
        .use(stringify, {
            bullet: '-',
            listItemIndent: 'one',
            fences: true,
            handlers: {
                // prevent from [ -> \[ transformation
                text,
            },
        })
        .processSync(rawSource);
    
    return contents;
};

