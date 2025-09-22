import {readFile} from 'node:fs/promises';

await readFile('./README.md', 'utf8');
