import process from 'node:process';
import {writeFile} from 'node:fs/promises';

const {keys} = Object;
const [name, path, outputFile] = process.argv.slice(2);

const data = await import(name);
const result = {};

for (const key of getKeys(data, path)) {
    if (key.startsWith('__'))
        continue;
    
    if (key === 'is')
        continue;
    
    if (/^[a-z]/.test(key) && !key.startsWith('is'))
        continue;
    
    if (key.toUpperCase() === key)
        continue;
    
    result[key] = `const {${key}} = ${path}`;
}

const output = JSON.stringify(result, null, 4) + '\n';

if (outputFile) {
    await writeFile(outputFile, output);
    process.stdout.write(`✅ ${name}: ${path}: ${outputFile}: updated seccessfully\n`);
    process.exit(0);
}

process.stdout.write(output);

function getKeys(data, path) {
    if (path)
        return keys(data[path]);
    
    return keys(data);
}
