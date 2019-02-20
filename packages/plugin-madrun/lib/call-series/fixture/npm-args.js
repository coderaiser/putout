'use strict';

module.exports = {
    'fix:lint': () => 'npm run lint:* -- --fix',
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    }
};

