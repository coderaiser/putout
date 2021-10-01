import test from 'supertape';
import {
    enable,
    enableAll,
    disable,
    disableAll,
} from './ruler.js';

test('putout: cli: ruler: enable', (t) => {
    const config = enable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: enable: parser', (t) => {
    const config = enable({}, 'parser');
    const expected = {
        rules: {
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: enable: exists', (t) => {
    const config = enable({rules: {}}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disable', (t) => {
    const config = disable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disable: not putout rule', (t) => {
    const config = disable({}, 'remove-unused-variables (stylelint)');
    const expected = {
        rules: {},
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: enable: not putout rule', (t) => {
    const config = enable({}, 'remove-unused-variables (stylelint)');
    const expected = {
        rules: {},
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disable: parser', (t) => {
    const config = disable({}, 'parser');
    const expected = {
        rules: {
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disable: exists: empty', (t) => {
    const config = disable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disableAll: tuple', (t) => {
    const places = [{
        rule: 'remove-unused-variables',
    }];
    
    const rules = {
        'remove-useless-spread/object': ['on', {
            exclude: 'module.exports.rules = __',
        }],
    };
    
    const config = disableAll({rules}, places);
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
            'remove-useless-spread/object': ['off', {
                exclude: 'module.exports.rules = __',
            }],
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disableAll', (t) => {
    const places = [{
        rule: 'remove-unused-variables',
    }];
    
    const config = disableAll({}, places);
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: disable: exists', (t) => {
    const places = [{
        rule: 'remove-unused-variables',
    }];
    
    const data = {
        rules: {
            'remove-unused-variables': false,
        },
    };
    
    const config = disableAll(data, places);
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: enableAll', (t) => {
    const places = [{
        rule: 'remove-unused-variables',
    }];
    const config = enableAll({}, places);
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: cli: ruler: enableAll: exists', (t) => {
    const places = [{
        rule: 'remove-unused-variables',
    }];
    const data = {
        rules: {
            'remove-unused-variables': false,
        },
    };
    const config = enableAll(data, places);
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});
