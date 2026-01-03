import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import test from 'supertape';
import putout from 'putout';
import {readFixtures} from '../../test/fixture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixture = readFixtures(__dirname, ['hermes', 'hermes-fix']);

test('putout: parser: hermes', (t) => {
    const {code} = putout(fixture.hermes, {
        parser: 'hermes',
        plugins: ['variables'],
    });
    
    const expected = fixture.hermesFix;
    
    t.deepEqual(code, expected);
    t.end();
});
