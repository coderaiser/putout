import fs from 'fs';

(async () => {
    const t = await fs.promises.readFile('hello');
})();

