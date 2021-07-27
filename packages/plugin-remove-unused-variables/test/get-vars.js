'use strict';

const test = require('supertape');
const {
    parse,
    traverse,
    template,
} = require('putout');

const getVarsOriginal = require('../lib/get-vars');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'arguments-nested',
    'array-expression',
    'array-pattern',
    'arrow-function-expression',
    'arrow-vars',
    'assignment-expression',
    'assignment-pattern',
    'assignment-function',
    'binary-expression',
    'call-expression',
    'conditional-expression',
    'condition-vars',
    'class-declaration',
    'class-import',
    'class-return',
    'destr-vars',
    'destr-assignment',
    'destr-assignment-array',
    'destr-nested-vars',
    'destr-fn-vars',
    'decorator',
    'do-while',
    'export-default-function',
    'export-default-anonymous-function',
    'export-default-class',
    'export-default-identifier',
    'export-default-object-expression',
    'export-named-declaration',
    'fn-call',
    'fn-call-vars',
    'fn-call-shorthand-vars',
    'fn-as-element',
    'fn-vars',
    'fn-args-vars',
    'fn-destr-args-vars',
    'fn-hoisted-vars',
    'for-of-statement',
    'for-in',
    'function-declaration',
    'function-as-argument',
    'import',
    'no-vars',
    'no-root-vars',
    'logical-expression',
    'member-expression',
    'new-expression',
    'object-expression',
    'object-method',
    'optional-member-expression',
    'optional-call-expression',
    'record',
    'scope-vars',
    'root-vars',
    'shorthand-vars',
    'expression-statement',
    'obj-prop',
    'return-statement',
    'switch-statement',
    'spread-vars',
    'tuple',
    'template-literal',
    'tagged-template-expression',
    'throw-statement',
    'try-catch',
    'undeclared-vars',
    'unary-expression',
    'update-expression',
    'variable-declarator',
    'jsx-opening-element',
    'jsx-template',
    'jsx-spread-attribute',
    'jsx-fragment',
    'jsx-member-expression',
    'yield',
    'await',
    'flow',
    'typescript',
    'typescript-namespace',
    'typescript-module',
    'typescript-as',
    'typescript-type-query',
    'typescript-function-type-parameter',
    'typescript-declare-function',
]);

const getVars = (a, b) => {
    return getVarsOriginal(a, {
        ...b,
        traverse,
    });
};

const isTS = true;

const du = 'du';
const d_ = 'd_';
const _u = '_u';

const dutify = (obj) => {
    const result = {};
    const entries = Object.entries(obj);
    
    for (const [name, {declared, used}] of entries) {
        const str = [
            declared ? 'd' : '_',
            used ? 'u' : '_',
        ].join('');
        
        result[name] = str;
    }
    
    return result;
};

test('remove-unused-variables: get-vars: no', (t) => {
    const ast = parse(fixture.noVars);
    const result = getVars(ast);
    const expected = [];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: logical expression', (t) => {
    const ast = parse(fixture.logicalExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        isOne: du,
        x: du,
        y: d_,
        tmpl: d_,
        location: _u,
    }, {
        host: du,
        origin: du,
        protocol: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: arguments nested', (t) => {
    const ast = parse(fixture.argumentsNested);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        add: d_,
    }, {
        state: d_,
        a: du,
        b: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: array expression', (t) => {
    const ast = parse(fixture.arrayExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        a: du,
        b: du,
        result: d_,
        spread: d_,
        forSpread: du,
        templated: du,
        template: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: array pattern', (t) => {
    const ast = parse(fixture.arrayPattern);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        a: d_,
        b: du,
        c: du,
        d: d_,
        z: d_,
        array: _u,
        console: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: arrow function expression', (t) => {
    const ast = parse(fixture.arrowFunctionExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        module: _u,
        DOM: _u,
        terminal: _u,
        assignment: d_,
        getParser: du,
    }, {
        panel: d_,
    }, {
        link: du,
    }, {
        char: du,
        key: du,
    }, {
        char: du,
        absent: du,
    }, {
        callback: du,
        query: du,
        url: du,
    }, {
        hello: d_,
        parser: du,
    }, {
        source: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: function declaration', (t) => {
    const ast = parse(fixture.functionDeclaration);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        getDOM: du,
        DOM: d_,
        fillTemplate: d_,
        objectPatternExample: d_,
        objectPattern2: du,
        assignment: du,
    }, {
        link: d_,
    }, {
        error: du,
        template: du,
    }, {
        a: d_,
    }, {
        a: d_,
        b: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: function as argument', (t) => {
    const ast = parse(fixture.functionAsArgument);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        co: _u,
    }, {
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: call expression', (t) => {
    const ast = parse(fixture.callExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        items: du,
        console: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: conditional expression', (t) => {
    const ast = parse(fixture.conditionalExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        a: du,
        b: du,
        c: d_,
        tmpl1: d_,
        tmpl2: d_,
        tmpl_a: du,
        tmpl_b: du,
        tmpl_c: du,
        tmpl_d: du,
        fn: d_,
    }, {
        sub: du,
    }, {
        add: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: assignment expression', (t) => {
    const ast = parse(fixture.assignmentExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        a: du,
        b: du,
        c: du,
        obj: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: assignment pattern', (t) => {
    const ast = parse(fixture.assignmentPattern);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        noop: du,
        _fn: du,
        def: d_,
        getName: _u,
        name: d_,
    }, {
        f: d_,
    }, {
        fn: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: assignment function', (t) => {
    const ast = parse(fixture.assignmentFunction);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        module: _u,
    }, {
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: binary expression', (t) => {
    const ast = parse(fixture.binaryExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        name: du,
        result: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: call expression', (t) => {
    const ast = parse(fixture.callExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        items: du,
        console: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: member expression', (t) => {
    const ast = parse(fixture.memberExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        msg: du,
        obj: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: new expression', (t) => {
    const ast = parse(fixture.newExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        obj: du,
        handler: du,
        Proxy: _u,
        a: _u,
        accessToken: du,
        DropBox: _u,
        t: d_,
    }, {
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: object expression', (t) => {
    const ast = parse(fixture.objectExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        parser: du,
        cherow: _u,
        module: _u,
        spreadExample: d_,
        nestedProperty: d_,
        arrayExample: d_,
        assignArrayExample: d_,
        computedExample: d_,
    }, {
        source: du,
    }, {
        module: du,
        spread: du,
    }, {
        nested: du,
    }, {
        array: d_,
        propertyValue: du,
    }, {
        assignProperty: du,
    }, {
        computedValue: du,
        computedKey: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: object method', (t) => {
    const ast = parse(fixture.objectMethod);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        Proxy: _u,
        console: _u,
    }, {
        target: du,
        property: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: optional member expression', (t) => {
    const ast = parse(fixture.optionalMemberExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        hello: _u,
        world: _u,
        a: _u,
        b: _u,
        c: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: optional call expression', (t) => {
    const ast = parse(fixture.optionalCallExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        map: _u,
        x: _u,
        y: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: unary expression', (t) => {
    const ast = parse(fixture.unaryExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        is: d_,
    }, {
        a: du,
        b: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: update expression', (t) => {
    const ast = parse(fixture.updateExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        i: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: root vars', (t) => {
    const ast = parse(fixture.rootVars);
    const result = getVars(ast);
    
    const expected = [{
        str: {
            declared: true,
            used: true,
        },
        str2: {
            declared: true,
            used: false,
        },
        str3: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: condition vars', (t) => {
    const ast = parse(fixture.conditionVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        x: {
            declared: true,
            used: true,
        },
        console: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: destr vars', (t) => {
    const ast = parse(fixture.destrVars);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        obj: du,
        a: d_,
        b: du,
        c: d_,
        console: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: destr assignment', (t) => {
    const ast = parse(fixture.destrAssignment);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        noop: du,
        beforeShow: d_,
        options: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: destr assignment: array', (t) => {
    const ast = parse(fixture.destrAssignmentArray);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        noop: du,
        beforeShow: d_,
        get: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: destr nested vars', (t) => {
    const ast = parse(fixture.destrNestedVars);
    const result = getVars(ast);
    
    const expected = [{
        obj: {
            declared: true,
            used: true,
        },
        world: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: destr fn vars', (t) => {
    const ast = parse(fixture.destrFnVars);
    const result = getVars(ast);
    
    const expected = [{
        readFileSync: {
            declared: true,
            used: true,
        },
        require: {
            declared: false,
            used: true,
        },
        m: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: decorator', (t) => {
    const ast = parse(fixture.decorator);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        React: _u,
        Timer: d_,
        observer: du,
        undefined: _u,
        Fn: d_,
        fn: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: do while', (t) => {
    const ast = parse(fixture.doWhile);
    const result = getVars(ast);
    
    const expected = [{
        a: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('remove-unused-variables: get-vars: import', (t) => {
    const ast = parse(fixture.import);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        readFileSync: du,
        writeFileSync: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export default function', (t) => {
    const ast = parse(fixture.exportDefaultFunction);
    const result = getVars(ast);
    
    const expected = [{
        addCommands: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export default anonymous function', (t) => {
    const ast = parse(fixture.exportDefaultAnonymousFunction);
    const result = getVars(ast);
    
    const expected = [];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export default identifier', (t) => {
    const ast = parse(fixture.exportDefaultIdentifier);
    const result = getVars(ast);
    
    const expected = [{
        Hello: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export default object expression', (t) => {
    const ast = parse(fixture.exportDefaultObjectExpression);
    const result = getVars(ast);
    
    const expected = [{
        init: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export default class', (t) => {
    const ast = parse(fixture.exportDefaultClass);
    const result = getVars(ast);
    
    const expected = [{
        Hello: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: export named declaration', (t) => {
    const ast = parse(fixture.exportNamedDeclaration);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        copyToClipboard: du,
        arrow: du,
        a: du,
        b: du,
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: no root vars', (t) => {
    const ast = parse(fixture.noRootVars);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: false,
            used: true,
        },
    }, {
        m: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: root vars: setPath', (t) => {
    const ast = parse(fixture.rootVars);
    const result = getVars(ast, {
        setPath: true,
    });
    
    const {str} = result.pop();
    
    t.ok(str.path, 'should path be');
    t.end();
});

test('remove-unused-variables: get-vars: fn call', (t) => {
    const ast = parse(fixture.fnCall);
    const result = getVars(ast);
    
    const expected = [{
        require: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn as element', (t) => {
    const ast = parse(fixture.fnAsElement);
    const result = getVars(ast);
    
    const expected = [{
        x: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn call shorthand vars', (t) => {
    const ast = parse(fixture.fnCallShorthandVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        console: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn call: vars', (t) => {
    const ast = parse(fixture.fnCallVars);
    const result = getVars(ast);
    
    const expected = [{
        t: {
            declared: true,
            used: true,
        },
        i: {
            declared: true,
            used: false,
        },
        require: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
test('remove-unused-variables: get-vars: fn vars', (t) => {
    const ast = parse(fixture.fnVars);
    const result = getVars(ast);
    
    const expected = [{
        one: {
            declared: true,
            used: false,
        },
        module: {
            declared: false,
            used: true,
        },
    }, {
        one: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: return statement', (t) => {
    const ast = parse(fixture.returnStatement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        one: du,
        two: du,
        three: du,
        four: du,
        f1: d_,
        f2: d_,
        f3: d_,
        f4: d_,
        f5: d_,
    }, {
        hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: switch statement', (t) => {
    const ast = parse(fixture.switchStatement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        name: du,
        console: _u,
        hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: expression statement', (t) => {
    const ast = parse(fixture.expressionStatement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        t: d_,
    }, {
        error: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: throw statement', (t) => {
    const ast = parse(fixture.throwStatement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        e: du,
        Error: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: try-catch', (t) => {
    const ast = parse(fixture.tryCatch);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        console: _u,
    }, {
        error_used: du,
    }, {
        error: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn args vars', (t) => {
    const ast = parse(fixture.fnArgsVars);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        f1: d_,
        f2: d_,
        f3: du,
        fs: _u,
    }, {
        a: d_,
        b: d_,
    }, {
        one: du,
        two: du,
    }, {
        one: d_,
        two: du,
        hi: d_,
    }, {
        name: du,
        fn: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn destr args vars', (t) => {
    const ast = parse(fixture.fnDestrArgsVars);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        arrow: d_,
        restFn: d_,
    }, {
        one: d_,
    }, {
        restOne: du,
        restVar: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: fn hoisted vars', (t) => {
    const ast = parse(fixture.fnHoistedVars);
    const result = getVars(ast);
    
    const expected = [{
        log: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: arrow vars', (t) => {
    const ast = parse(fixture.arrowVars);
    const result = getVars(ast);
    
    const expected = [{
        one: {
            declared: true,
            used: true,
        },
        f: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: scope vars', (t) => {
    const ast = parse(fixture.scopeVars);
    const result = getVars(ast);
    
    const expected = [{
        f: {
            declared: true,
            used: false,
        },
    }, {
        m: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: shorthand vars', (t) => {
    const ast = parse(fixture.shorthandVars);
    const result = getVars(ast);
    
    const expected = [{
        name: {
            declared: true,
            used: true,
        },
        t: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: for of statement', (t) => {
    const ast = parse(fixture.forOfStatement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        array: du,
        console: _u,
        el: du,
    }, {
        empty: du,
    }, {
        item: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: for in', (t) => {
    const ast = parse(fixture.forIn);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        key: du,
        key2: _u,
        jqCache: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: obj prop', (t) => {
    const ast = parse(fixture.objProp);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: true,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: spread vars', (t) => {
    const ast = parse(fixture.spreadVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        obj: {
            declared: true,
            used: true,
        },
        spread: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: tuple', (t) => {
    const ast = parse(fixture.tuple);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        x: du,
        y: du,
        z: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: record', (t) => {
    const ast = parse(fixture.record);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        x: du,
        y: du,
        z: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: template literal', (t) => {
    const ast = parse(fixture.templateLiteral);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        x: du,
        y: du,
        z: du,
        msg: d_,
        console: _u,
        f: d_,
        module: _u,
        assign: d_,
    }, {
        a: du,
    }, {
        name: du,
        password: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: tagged template expression', (t) => {
    const ast = parse(fixture.taggedTemplateExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        codegen: du,
        date: d_,
        require: _u,
        console: _u,
    }, {
        a: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: undeclared vars', (t) => {
    const ast = parse(fixture.undeclaredVars);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: variable declarator', (t) => {
    const ast = parse(fixture.variableDeclarator);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        a: du,
        b: du,
        x: d_,
        y: du,
        z: _u,
        log: du,
        fn: d_,
    }, {
        msg: d_,
    }, {
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: class declarator', (t) => {
    const ast = parse(fixture.classDeclaration);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        B: _u,
        A: d_,
        C: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: class import', (t) => {
    const ast = parse(fixture.classImport);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        Component: du,
        wrap: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: class return', (t) => {
    const ast = parse(fixture.classReturn);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        PureComponent: du,
        React: _u,
        wrap: du,
        require: _u,
    }, {
        HelloComponent: du,
    }, {
        Hello: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: jsx opening element', (t) => {
    const ast = parse(fixture.jsxOpeningElement);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        App: du,
        Main: du,
        require: _u,
        React: du,
    }, {
        str: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: jsx template', (t) => {
    const ast = parse(fixture.jsxTemplate);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        React: du,
        module: _u,
        require: _u,
    }, {
        isOpen: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: jsx fragment', (t) => {
    const ast = parse(fixture.jsxFragment);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        React: du,
        module: _u,
        require: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: jsx member expression', (t) => {
    const ast = parse(fixture.jsxMemberExpression);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        React: du,
        x: d_,
        a: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: jsx spread attribute', (t) => {
    const ast = parse(fixture.jsxSpreadAttribute);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        fn: d_,
        simple: d_,
        require: _u,
        React: du,
    }, {
        spread: du,
    }, {
        props: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: await', (t) => {
    const ast = parse(fixture.await);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        hello: d_,
    }, {
        world: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: yield', (t) => {
    const ast = parse(fixture.yield);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        hello: d_,
    }, {
        world: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: template: no loc', (t) => {
    const ast = parse(fixture.noVars);
    const buildRequire = template(`
        function fn() {
            var hello;
        }
    `);
    
    const variable = buildRequire();
    ast.program.body.push(variable);
    
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        fn: d_,
    }, {
        hello: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: flow', (t) => {
    const ast = parse(fixture.flow);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        SourceType: du,
        NodeBase: _u,
        Array: _u,
        N: du,
        State: du,
        IInputHandlingTerminal: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript', (t) => {
    const ast = parse(fixture.typescript, {isTS: true});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        Lines: du,
        Options: du,
        namedTypes: du,
        FastPathType: d_,
        callback: du,
        names: du,
        Viewport: du,
        IViewport: _u,
        IInputHandlingTerminal: du,
        Pos: d_,
    }, {
        options: d_,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
test('remove-unused-variables: get-vars: typescript: namespace', (t) => {
    const ast = parse(fixture.typescriptNamespace, {isTS: true});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        children: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript: module', (t) => {
    const ast = parse(fixture.typescriptModule, {isTS: true});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        children: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript: as', (t) => {
    const ast = parse(fixture.typescriptAs, {isTS});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        t: d_,
        cms: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript: declare function', (t) => {
    const ast = parse(fixture.typescriptDeclareFunction, {isTS});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        args: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript: type query', (t) => {
    const ast = parse(fixture.typescriptTypeQuery, {isTS});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        superType: du,
        cms: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: get-vars: typescript: function type parameter', (t) => {
    const ast = parse(fixture.typescriptFunctionTypeParameter, {isTS});
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        Hello: du,
        params: du,
        x: du,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

