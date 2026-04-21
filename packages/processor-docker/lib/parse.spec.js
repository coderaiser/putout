import {test} from 'supertape';
import {montag} from 'montag';
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

test('putout: processor-docker: parse: flags', (t) => {
    const ast = parse(montag`
        COPY --from=build root/.bun /root/.bun
    `);
    
    const expected = [
        ['COPY', '--from=build', 'root/.bun /root/.bun'],
    ];
    
    t.deepEqual(ast, expected);
    t.end();
});
