import {operator} from 'putout';

const {ignore, __json} = operator;
const {
    match,
    replace,
    report,
} = ignore(__json, {
    name: '.nycrc.json',
    property: 'exclude',
    list: [
        '**/*.config.*',
    ],
});

export {
    match,
    replace,
    report,
};
