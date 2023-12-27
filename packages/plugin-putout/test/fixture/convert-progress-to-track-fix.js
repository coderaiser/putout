import {operator} from 'putout';

const {findFile} = operator;

module.exports.scan = (root, {push, progress, trackFile}) => {
    const files = trackFile(root, ['*']);
    const n = files.length;
    
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
