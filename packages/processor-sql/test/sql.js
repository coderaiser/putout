import {createTest} from '@putout/test/processor';
import {__sql_name} from '@putout/operator-json';
import {montag} from 'montag';
import {merge} from '../lib/sql.js';

const test = createTest(import.meta.url, {
    extension: 'sql',
    processors: ['sql'],
    plugins: [],
});

test('putout: processor: sql', async ({noProcess}) => {
    await noProcess('sql');
});

test('putout: processor: sql: merge', async ({equal}) => {
    const result = merge('hello', [`${__sql_name}(select('*', from(abc)));`]);
    const expected = montag`
        SELECT *
        FROM abc\n
    `;
    
    equal(result, expected);
});
