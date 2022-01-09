import {readFile, readDir} from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

readFile(__filename);
readDir(__dirname);
