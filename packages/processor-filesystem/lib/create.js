import * as _filesystemCLI from '@putout/cli-filesystem';
import {inject, eject} from '@putout/operator-filesystem/maybe';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {isFilesystem} from './is-filesystem.js';
import {maybeFromSimple} from './from-simple.js';

export const create = (overrides = {}) => {
    const {
        cli = false,
        maybeSimple = true,
        filesystemCLI,
    } = overrides;
    
    const branch = createBranch({
        cli,
        maybeSimple,
        filesystemCLI,
    });
    
    const merge = createMerge({
        cli,
    });
    
    return {
        branch,
        merge,
    };
};

const createBranch = (overrides) => (rawSource) => {
    const {
        cli,
        maybeSimple,
        filesystemCLI = _filesystemCLI,
    } = overrides;
    
    cli && inject(filesystemCLI);
    
    if (!maybeSimple)
        return [{
            source: toJS(rawSource, __filesystem),
        }];
    
    const source = toJS(maybeFromSimple(rawSource), __filesystem);
    
    return [{
        source,
    }];
};

const createMerge = ({cli}) => (rawSource, list) => {
    cli && eject();
    
    const [source] = list.filter(isFilesystem);
    
    return fromJS(source, __filesystem);
};
