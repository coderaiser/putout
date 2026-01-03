import test from 'supertape';
import montag from 'montag';
import {tryCatch} from 'try-catch';
import {parse} from './parse.js';
import {generate} from './generate.js';
import * as babel from './parsers/babel/index.js';
import {print} from './print.js';

test('putout: engine-parser: parse: await without async', (t) => {
    const source = `const hello = () => await world()`;
    const ast = parse(source);
    
    t.ok(ast);
    t.end();
});

test('putout: engine-parser: using', (t) => {
    const source = 'await using obj = g();\n';
    const ast = parse(source);
    const code = print(ast);
    
    t.equal(code, source);
    t.end();
});

test('putout: engine-parser: babel: decoratorAutoAccessors', (t) => {
    const source = montag`
        class SomeClass {
            @setMetadata
            foo = 123;
            
            @setMetadata
            accessor bar = "hello!";
            
            @setMetadata
            baz() { }
        }
    `;
    
    const [error] = tryCatch(parse, source);
    
    t.notOk(error);
    t.end();
});

test('putout: engine-parser: babel: discard binding', (t) => {
    const source = montag`
        {
            using void = new AcquireLock(mutex);
        }
    `;
    
    const [error] = tryCatch(parse, source);
    
    t.notOk(error);
    t.end();
});

test('putout: engine-parser: babel: sourcePhaseImports', (t) => {
    const source = montag`
        import source x from 'x';
    `;
    
    const [error] = tryCatch(parse, source);
    
    t.notOk(error);
    t.end();
});

test('putout: engine-parser: babel: deferredImportEvaluation', (t) => {
    const source = montag`
        import defer * as myMod from "./mod";
    `;
    
    const [error] = tryCatch(parse, source);
    
    t.notOk(error);
    t.end();
});

test('putout: engine-parser: babel: optionalChainingAssign', (t) => {
    const source = montag`
        maybeAnObj?.prop = theValue;
    `;
    
    const [error] = tryCatch(parse, source);
    
    t.notOk(error);
    t.end();
});

test('putout: engine-parser: parse + generate = sourcemap', (t) => {
    const source = `const hello = 'world';`;
    
    const ast = babel.parse(source, {
        sourceFilename: 'hello.js',
    });
    
    const {map} = generate(ast, {sourceMaps: true}, {
        'hello.js': source,
    });
    
    t.ok(map, 'returns map');
    t.end();
});

test('putout: engine-parser: parse: set extra.__putout_printer', (t) => {
    const source = `const hello = 'world';`;
    const ast = parse(source);
    const {__putout_printer} = ast.program.extra;
    
    t.equal(__putout_printer, 'putout');
    t.end();
});

test('putout: engine-parser: parse: set extra.__putout_printer: babel', (t) => {
    const source = `const hello = 'world';`;
    const ast = parse(source, {
        printer: 'babel',
    });
    
    const {__putout_printer} = ast.program.extra;
    
    t.equal(__putout_printer, 'babel');
    t.end();
});

test('putout: engine-parser: parse: tuple', (t) => {
    const source = [`const hello = 'world';`];
    const [error] = tryCatch(parse, source);
    
    t.equal(error.message, `☝️ Looks like type of 'source' is not 'string', but 'object'`);
    t.end();
});
