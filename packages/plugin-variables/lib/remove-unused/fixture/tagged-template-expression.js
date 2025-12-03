const codegen = require('codegen.macro');
const date = codegen`module.exports = '"' + Date() + '"'`;

((a) => console.log(a))`hello`;

