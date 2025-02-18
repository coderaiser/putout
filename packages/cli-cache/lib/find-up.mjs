import {join} from 'node:path';
import process from 'node:process';
import escalade from 'escalade';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const includesName = (name) => (dir, names) => {
    for (const currentName of maybeArray(name)) {
        if (names.includes(currentName))
            return join(dir, currentName);
    }
    
    return '';
};

export const findUp = async (name, {cwd = process.cwd()} = {}) => {
    return await escalade(cwd, includesName(name));
};

