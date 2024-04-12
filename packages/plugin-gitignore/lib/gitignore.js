import {operator} from 'putout';

const {ignore, __ignore} = operator;
const {
    match,
    replace,
    report,
} = ignore(__ignore, {
    name: '.gitignore',
    list: [
        '.idea',
        '*.swp',
        'yarn-error.log',
        'coverage',
    ],
});

export {
    match,
    replace,
    report,
};
