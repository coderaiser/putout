import {
    test,
    stub,
} from 'supertape';
import {chooseFormatter} from './choose-formatter.mjs';

const {stringify} = JSON;

test('putout: cli: choose-formatter', async (t) => {
    const readFile = stub().returns(stringify({
        dependencies: {
            'formatter-dump': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('dump');
    const [, result] = await chooseFormatter({
        readFile,
        choose,
    });
    
    const expected = 'dump';
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: choose-formatter: getFormatters', async (t) => {
    const readFile = stub().returns(stringify({
        dependencies: {
            '@putout/formatter-dump': '^7.0.0',
        },
    }));
    
    const choose = stub().returns('dump');
    
    await chooseFormatter({
        readFile,
        choose,
    });
    
    const expected = ['Choose formatter', ['dump']];
    
    t.calledWith(choose, expected);
    t.end();
});

test('putout: cli: choose-formatter: error', async (t) => {
    const readFile = stub().returns(stringify({
        dependencies: {
            'formatter-dump': '^7.0.0',
        },
    }).replace(`"`, '*'));
    
    const choose = stub().returns('dump');
    const [error] = await chooseFormatter({
        readFile,
        choose,
    });
    
    t.ok(error);
    t.end();
});
