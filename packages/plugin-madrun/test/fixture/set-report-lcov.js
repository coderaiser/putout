import {run} from 'madrun';

export default {
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

