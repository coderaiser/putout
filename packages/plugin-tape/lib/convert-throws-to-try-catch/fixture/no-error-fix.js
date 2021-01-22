const tryCatch = require('try-catch');
const [error] = tryCatch(keys);
t.ok(error, 'should throw when no args');
