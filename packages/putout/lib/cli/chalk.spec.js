import test from 'supertape';
import {
    red,
    green,
    bgBlueBright,
} from './chalk.js';

test('putout: cli: chalk: red', (t) => {
    const result = red('hello');
    
    t.match(result, 'hello');
    t.end();
});

test('putout: cli: chalk: green', (t) => {
    const result = green('hello');
    
    t.match(result, 'hello');
    t.end();
});

test('putout: cli: chalk: bgBlueBright', (t) => {
    const result = bgBlueBright('hello');
    
    t.match(result, 'hello');
    t.end();
});
