'use strict';

module.exports = {
    'lint': () => 'redrun lint:*',
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    }
};

