import {jessy} from 'jessy';
import {nessy} from 'nessy';
import {traverse, types} from '@putout/babel';
import {template} from '@putout/engine-parser';
import {replaceWith, extract} from '@putout/operate';
import {prepareBodyWay} from './prepare-body-way.js';
import {
    is,
    isArgsStr,
    isTypeParamsStr,
    isJSXChildrenStr,
    isJSXAttributesStr,
    isImportsStr,
    isExportsStr,
    isInsideTypeReference,
    isInsideTypeParameter,
    isBodyStr,
} from '../is.js';

const {
    isIdentifier,
    isStatement,
    isJSXElement,
    isJSXAttribute,
    isStringLiteral,
    isTemplateLiteral,
    templateElement,
} = types;

const {extractExpression} = template;

const {entries} = Object;
const isNumber = (a) => typeof a === 'number';
const isString = (a) => typeof a === 'string';

const parseNode = (a) => a.node || a;
const {stringify} = JSON;

export const getTemplateValues = (node, str) => {
    if (!isString(str))
        throw Error(`☝️ Looks like argument 'template' of 'getTemplateValues(node, template)': is not a string, but '${stringify(str)}'`);
    
    node = parseNode(node);
    
    const templateNode = template.ast(str);
    const waysFrom = findVarsWays(templateNode);
    
    return getValues({
        node,
        waysFrom,
    });
};

export function findVarsWays(node) {
    if (isIdentifier(node) && is(node.name))
        return {
            [node.name]: [''],
        };
    
    const vars = {};
    
    traverse(node, {
        noScope: true,
        'Identifier|JSXIdentifier|BooleanLiteral|StringLiteral|TemplateElement|RegExpLiteral|JSXText|JSXAttribute|TSTypeReference|TSTypeParameter'(path) {
            if (isInsideTypeReference(path))
                return;
            
            if (isInsideTypeParameter(path))
                return;
            
            const {node} = path;
            
            if (isJSXAttribute(path.parentPath) && path.parentPath.node.name === node)
                return;
            
            const way = [];
            const name = extract(node);
            
            if (!is(name))
                return;
            
            path.find(({key, listKey}) => {
                if (isNumber(key)) {
                    way.unshift(`${listKey}.${key}`);
                    return;
                }
                
                way.unshift(key);
            });
            
            vars[name] = vars[name] || [];
            vars[name].push(way.join('.'));
        },
    });
    
    return vars;
}

export function getValues({waysFrom, node}) {
    const result = {};
    
    for (const [name, ways] of entries(waysFrom)) {
        for (let way of ways) {
            if (isImportsStr(name) || isExportsStr(name))
                way = way.replace(/\.0.local$/, '');
            else if (isArgsStr(name) || isJSXChildrenStr(name) || isJSXAttributesStr(name) || isTypeParamsStr(name))
                way = way.replace(/\.0$/, '');
            
            if (!isJSXElement(node))
                way = way.replace(/\.expression$/, '');
            
            if (isBodyStr(name))
                way = prepareBodyWay(way);
            
            result[name] = result[name] || extractExpression(jessy(way, node));
        }
    }
    
    return result;
}

const makeRaw = (a) => a.replace('`', '\\`');

export function setValues({waysTo, values, path}) {
    const node = extractExpression(path.node);
    
    for (const [name, ways] of entries(waysTo)) {
        for (let way of ways) {
            if (!way) {
                replaceWith(path, values[name]);
                continue;
            }
            
            if (isImportsStr(name) || isExportsStr(name))
                way = way.replace(/\.0.local$/, '');
            
            if (isArgsStr(name) || isJSXChildrenStr(name) || isJSXAttributesStr(name))
                way = way.replace(/\.0$/, '');
            
            if (isStatement(values[name]))
                way = way.replace(/\.expression$/, '');
            
            if (isStringLiteral(values[name]) && isTemplateLiteral(node)) {
                const {value} = values[name];
                
                const element = templateElement({
                    raw: makeRaw(value),
                });
                
                nessy(way, element, node);
                continue;
            }
            
            if (isBodyStr(name))
                way = prepareBodyWay(way);
            
            const {extra} = jessy(way, node);
            
            if (extra) {
                const valueExtra = values[name].extra;
                
                values[name].extra = {
                    ...extra,
                    ...valueExtra,
                };
            }
            
            nessy(way, values[name], node);
        }
    }
}
