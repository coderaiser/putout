import {join} from 'node:path';
import process from 'node:process';
import _escalade from 'escalade';

const includesName = (directory) => (dir, names) => {
    return names.includes(directory) && join(dir, directory);
};

const {cwd: _cwd} = process;

export async function findNodeModules(overrides = {}) {
    const {
        escalade = _escalade,
        cwd = _cwd,
        directory = 'node_modules',
    } = overrides;
    
    const input = join(cwd(), 'package.json');
    
    return await escalade(input, includesName(directory));
}
