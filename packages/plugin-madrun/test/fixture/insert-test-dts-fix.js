import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
};

function withTestDts() {
    export default {
        'wisdom': () => run(['lint', 'coverage']),
        'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
        'test:dts': () => 'check-dts test/*.ts',
    };
}

function withoutTest() {
    export default {
        a,
    };
}
