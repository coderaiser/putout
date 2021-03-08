const {readFile} = require('fs/promises');
const file = await readFile(join(__dirname, 'fixture', 'js.md'), 'utf8');
