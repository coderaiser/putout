import {readFile} from 'node:fs/promises';
import {
    readFileSync,
    writeFileSync,
    unlinkSync,
} from 'node:fs';
import {
    join,
    extname,
    basename,
} from 'node:path';
import process from 'node:process';
import eslint from '@putout/eslint';
import tryToCatch from 'try-to-catch';
import {extend} from 'supertape';
import {lint} from '@putout/eslint/lint';
import tryCatch from 'try-catch';

const {keys} = Object;
const {isArray} = Array;

const isUpdate = () => process.env.UPDATE === '1';

const update = (name, data) => {
    const fn = global.writeFileSync || writeFileSync;
    fn(name, data);
};

const remove = (name) => {
    const ext = extname(name);
    const base = basename(name, ext);
    const fixtureName = name.replace(base, `${base}-fix`);
    
    const fn = global.unlinkSync || unlinkSync;
    
    tryCatch(fn, String(fixtureName));
};

const getMessage = ({message}) => message;

const config = {
    extends: [
        'plugin:n/recommended',
        'plugin:eslint-plugin/recommended',
        'plugin:putout/recommended',
    ],
};

const readSync = (name) => {
    const [, data] = tryCatch(readFileSync, `${name}.js`, 'utf8');
    
    if (data)
        return [
            `${name}.js`,
            data,
        ];
    
    return [`${name}.ts`, readFileSync(`${name}.ts`, 'utf8')];
};

const read = async (name) => {
    const [, data] = await tryToCatch(readFile, `${name}.js`, 'utf8');
    
    if (data)
        return [
            `${name}.js`,
            data,
        ];
    
    return [`${name}.ts`, await readFile(`${name}.ts`, 'utf8')];
};

export const createTest = (url, plugins = {}) => {
    const fixtureDir = new URL('fixture', url).pathname;
    
    return extend({
        process: (operator) => async (name, override) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            const fix = true;
            
            const [source] = await eslint({
                name: resolvedName,
                code,
                fix,
                putout: true,
                config: {
                    ...config,
                    ...override,
                },
            });
            
            if (isUpdate()) {
                update(resolvedName, source);
                return operator.pass('fixture updated');
            }
            
            const [, fixture] = await read(`${full}-fix`);
            
            return operator.equal(source, fixture);
        },
        noProcess: (operator) => async (name, overrides) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            const fix = true;
            
            const [source] = await eslint({
                name: resolvedName,
                config: {
                    ...config,
                    ...overrides,
                },
                code,
                putout: true,
                fix,
            });
            
            if (isUpdate()) {
                remove(resolvedName);
                return operator.pass('fixture updated');
            }
            
            return operator.equal(source, code);
        },
        comparePlaces: (operator) => async (name, expected, override) => {
            const full = join(fixtureDir, name);
            const [resolvedName, code] = await read(full);
            
            const [, places] = await eslint({
                name: resolvedName,
                code,
                putout: true,
                config: {
                    ...config,
                    ...override,
                },
            });
            
            return operator.deepEqual(places, expected);
        },
        report: (t) => (name, message, fail = t.fail) => {
            if (!keys(plugins).length)
                return fail('☝️ Looks like plugins not passed');
            
            const full = join(fixtureDir, name);
            const [, source] = readSync(full);
            
            const [, places] = lint(source, {
                fix: false,
                plugins,
            });
            
            const resultMessages = places.map(getMessage);
            
            if (isArray(message))
                return t.deepEqual(resultMessages, message);
            
            return t.equal(resultMessages[0], message);
        },
        transform: (t) => (name, fail = t.fail) => {
            if (!keys(plugins).length)
                return fail('☝️ Looks like plugins not passed');
            
            const full = join(fixtureDir, name);
            const [, source] = readSync(full);
            const [, fixture] = readSync(`${full}-fix`);
            
            const [code] = lint(source, {
                fix: true,
                plugins,
            });
            
            return t.equal(code, fixture);
        },
    });
};
