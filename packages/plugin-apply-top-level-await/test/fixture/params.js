import fs from 'fs';

(async (a, b) => {
    const t = await fs.promises.readFile('hello');
})();

