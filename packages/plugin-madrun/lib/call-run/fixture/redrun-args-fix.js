'use strict';

module.exports = {
    'fix:lint': () => run(['lint:*'], '--fix'),
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    },
};
