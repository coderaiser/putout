import {
    test,
    stub,
} from 'supertape';
import {chooseFormatter} from './index.mjs';

const {stringify} = JSON;

test('putout: cli: choose-formatter', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        dependencies: {
            'formatter-dump': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('dump');
    
    const result = await chooseFormatter({
        readFile,
        writeFile,
        choose,
    });
    
    const expected = 'dump';
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('dump');
    const autofocus = false;
    
    await chooseFormatter({
        autofocus,
        readFile,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump'], {
        autofocus: false,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters: autofocus', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: ['progress-bar', {}],
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
            '@putout/formatter-progress-bar': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('progress-bar');
    
    await chooseFormatter({
        readFile,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump', 'progress-bar'], {
        autofocus: 1,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters: formatter', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
            '@putout/formatter-progress-bar': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('progress-bar');
    
    await chooseFormatter({
        readFile,
        writeFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump', 'progress-bar'], {
        autofocus: 1,
    }];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: nothign chosen', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
            '@putout/formatter-progress-bar': '^7.0.0',
        },
    }));
    
    const choose = stub();
    
    await chooseFormatter({
        readFile,
        writeFile,
        choose,
    });
    
    t.notCalled(writeFile);
    t.end();
});

test('putout: cli: choose-formatter: nothign chosen: not found', async (t) => {
    const findUp = stub();
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        formatter: 'progress-bar',
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
            '@putout/formatter-progress-bar': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('dump');
    
    await chooseFormatter({
        readFile,
        writeFile,
        findUp,
        choose,
    });
    
    t.notCalled(writeFile);
    t.end();
});
