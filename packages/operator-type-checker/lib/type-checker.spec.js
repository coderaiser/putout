import {test, stub} from 'supertape';
import {createTypeChecker} from './type-checker.js';

test('@putout/operator-type-checker: createTypeChecker', (t) => {
    const node = {
        type: 'StringLiteral',
    };
    
    const is = createTypeChecker([
        '+: -> !Identifier',
    ]);
    
    const result = is(node);
    
    t.ok(result);
    t.end();
});

test('@putout/operator-type-checker: createTypeChecker: typeOptions', (t) => {
    const typeOptions = {
        instrumentName: 'PUTOUT_INSTRUMENT',
    };
    
    const create = stub().returns(stub());
    
    const checkers = [
        '+: -> !Identifier',
    ];
    
    createTypeChecker(checkers, {
        create,
    });
    
    t.calledWith(create, [checkers, typeOptions]);
    t.end();
});
