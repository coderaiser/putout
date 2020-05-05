'use strict';

const {reRequire} = require('mock-require');
const currify = require('currify');

module.exports = currify(async (name, args, options = {}) => {
    const {
        dir = process.cwd(),
    } = options;
    const {log, error} = console;
    const {write} = process.stdout;
    
    const errors = [];
    const data = [];
    
    process.stdout.write = (a) => {
        data.push(a);
    };
    
    console.error = (a) => {
        errors.push(a);
    };
    
    console.log = (a) => {
        data.push(a);
    };
    
    const {
        exit,
        argv,
        cwd,
    } = process;
    const [a, b] = argv;
    
    process.cwd = () => dir || cwd();
    
    let exitCode = 0;
    process.exit = (code) => {
        exitCode = code;
    };
    
    process.argv = [
        a,
        b,
        ...args.split(' '),
    ];
    
    await reRequire(name);
    
    console.log = log;
    console.error = error;
    process.exit = exit;
    process.argv = argv;
    process.stdout.write = write;
    process.cwd = cwd;
    
    return {
        exitCode,
        stdout: data.join(''),
        stderr: errors.join(''),
    };
});

