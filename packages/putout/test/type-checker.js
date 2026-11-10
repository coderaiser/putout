import {test} from 'supertape';
import {putout} from '../lib/index.js';
import {parseOptions} from '../lib/parse-options/index.js';

const source = `createTypeChecker([['-: path.node.id', Boolean]]);\n`;

const readOptions = () => ['', {}];
const readHomeOptions = () => ({});

const getOptions = (options) => ({
    fix: false,
    ...parseOptions({
        name: 'index.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods: readHomeOptions,
    }, {
        cwd: '/',
        readdirSync: () => [],
    }),
});

const getRules = ({places}) => places.map(({rule}) => rule);

test('putout: type-checker: disabled by default', (t) => {
    const result = getRules(putout(source, getOptions({})));
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: type-checker: enabled', (t) => {
    const result = getRules(putout(source, getOptions({
        rules: {
            'type-checker': 'on',
        },
    }))).join();
    
    t.match(result, 'type-checker/apply-boolean-operator-to-type-checker');
    t.end();
});
