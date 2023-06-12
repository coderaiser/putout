'use strict';

module.exports = {
    'lint': () => run(['lint:*']),
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    },
};
