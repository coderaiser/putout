import process from 'node:process';
import {writeFile} from 'node:fs/promises';

const {keys} = Object;
const [name, outputFile] = process.argv.slice(2);

if (!name) {
    process.stdout.write('create-declare [name] [output]\n');
    process.exit(1);
}

const data = await import(`${name}/promises`);
const result = {};

for (const key of keys(data)) {
    if (key === 'promises')
        continue;
    
    if (key === 'default')
        continue;
    
    result[key] = `import {${key}} from 'node:${name}/promises'`;
}

const output = `export default ${JSON.stringify(result, null, 4) + '\n'}`;

if (outputFile) {
    await writeFile(outputFile, output);
    process.stdout.write(`✅ ${name}: ${outputFile}: updated successfully\n`);
    process.exit(0);
}

process.stdout.write(output);
