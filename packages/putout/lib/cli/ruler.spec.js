'use strict';

const test = require('supertape');
const {
    enable,
    enableAll,
    disable,
    disableAll,
} = require('./ruler');

test('putout: ruler: enable', (t) => {
    const config = enable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: enable: parser', (t) => {
    const config = enable({}, 'parser');
    const expected = {
        rules: {
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: enable: exists', (t) => {
    const config = enable({rules: {}}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'on',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: disable', (t) => {
    const config = disable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: disable: not putout rule', (t) => {
    const config = disable({}, 'remove-unused-variables (stylelint)');
    const expected = {
        rules: {},
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: enable: not putout rule', (t) => {
    const config = enable({}, 'remove-unused-variables (stylelint)');
    const expected = {
        rules: {},
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: disable: parser', (t) => {
    const config = disable({}, 'parser');
    const expected = {
        rules: {
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: disable: exists', (t) => {
    const config = disable({}, 'remove-unused-variables');
    const expected = {
        rules: {
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(config, expected);
    t.end();
});

test('putout: ruler: disableAll', (t) => {
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

test('putout: ruler: disable: exists', (t) => {
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

test('putout: ruler: enableAll', (t) => {
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

test('putout: ruler: enableAll: exists', (t) => {
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
