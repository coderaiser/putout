'use strict';

module.exports = {
    'lint': () => series(['lint:*']),
    'test': () => 'tape test',
    'big': () => {
        return 'tape test';
    }
};

