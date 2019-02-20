'use strict';

module.exports = {
    'fix:lint': () => 'redrun lint:* -- --fix',
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    }
};

