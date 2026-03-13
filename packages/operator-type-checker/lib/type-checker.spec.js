import {test} from 'supertape';
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
