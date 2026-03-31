import {test} from 'supertape';
import montag from 'montag';
import {parse} from './parse.js';

test('putout: processor-docker: parse', (t) => {
    const ast = parse(montag`
        ENV TERM=xterm-256color
        EXPOSE 8000
    `);
    
    const expected = [
        ['ENV', 'TERM=xterm-256color'],
        ['EXPOSE', '8000'],
    ];
    
    t.deepEqual(ast, expected);
    t.end();
});
