const a = 5;

const name = 'hello.txt';
const {readFileSync} = require('fs/promises');
readFileSync(name);
