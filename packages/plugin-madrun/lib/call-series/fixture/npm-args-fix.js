'use strict';

module.exports = {
    'fix:lint': () => series(['lint:*'], '--fix'),
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    }
};

