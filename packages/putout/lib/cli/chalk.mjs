import {styleText} from 'node:util';

const red = (a) => styleText('red', a);

const bgBlueBright = (a) => styleText('bgBlueBright', a);

const chalk = {
    red,
    bgBlueBright,
};

export default chalk;
