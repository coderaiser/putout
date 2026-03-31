import {test} from 'supertape';
import montag from 'montag';
import {print} from './print.js';

test('putout: processor-docker: print', (t) => {
    const ast = [
        ['ENV', 'TERM=xterm-256color'],
        ['EXPOSE', '8000'],
    ];
    
    const result = print(ast);
    
    const expected = montag`
        ENV TERM=xterm-256color
        EXPOSE 8000
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: processor-docker: print: && ', (t) => {
    const ast = [
        [
            'RUN',
            'a',
            '&&',
            'b',
        ],
    ];
    
    const result = print(ast);
    
    const expected = montag`
        RUN a && \\
            b
    `;
    
    t.equal(result, expected);
    t.end();
});
