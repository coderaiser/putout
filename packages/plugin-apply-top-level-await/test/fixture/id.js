import fs from 'fs';

(async function hello() {
    const t = await fs.promises.readFile('hello');
})();

