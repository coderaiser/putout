import {
    types,
    template as babelTemplate,
} from '@putout/babel';
import nano from 'nano-memoize';
import {clearWatermark} from '@putout/operator-watermark';
import plugins from './parsers/babel/plugins.js';
import * as options from './parsers/babel/options.js';

const {
    nanomemoize = nano,
} = nano;

const defaults = {
    ...options,
    plugins: [
        ...plugins,
        'typescript',
        'jsx',
    ],
};

const {
    isExpressionStatement,
    isTSExternalModuleReference,
} = types;

const extractExpression = (a) => {
    if (isExpressionStatement(a))
        return a.expression;
    
    if (isTSExternalModuleReference(a))
        return a.expression;
    
    return a;
};

export const template = nanomemoize((value, options) => {
    const fn = babelTemplate(value, {
        ...defaults,
        ...options,
    });
    
    return (...a) => {
        const result = fn(...a);
        return extractExpression(result);
    };
});

template.extractExpression = extractExpression;

const templateAst = nanomemoize((value, options) => {
    const result = babelTemplate.ast(value, {
        ...defaults,
        ...options,
    });
    
    return extractExpression(result);
});

template.ast = (...a) => {
    const node = templateAst(...a);
    
    clearWatermark(node);
    
    return node;
};

template.program = nanomemoize((value, options) => {
    const result = babelTemplate.program(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

template.program.ast = nanomemoize((value, options) => {
    const result = babelTemplate.program.ast(value, {
        ...defaults,
        ...options,
    });
    
    return result;
});

template.ast.fresh = (value, options) => {
    const result = babelTemplate.ast(value, {
        ...defaults,
        ...options,
    });
    
    return extractExpression(result);
};
