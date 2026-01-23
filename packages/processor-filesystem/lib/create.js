import * as filesystemCLI from '@putout/cli-filesystem';
import * as filesystem from '@putout/operator-filesystem';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {isFilesystem} from './is-filesystem.js';
import {maybeFromSimple} from './from-simple.js';

export const create = (overrides = {}) => {
    const {cli = false, maybeSimple = true} = overrides;
    
    const branch = createBranch({
        cli,
        maybeSimple,
    });
    
    const merge = createMerge({
        cli,
    });
    
    return {
        branch,
        merge,
    };
};

const createBranch = ({cli, maybeSimple}) => (rawSource) => {
    cli && filesystem.init(filesystemCLI);
    
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
    cli && filesystem.deinit();
    
    const [source] = list.filter(isFilesystem);
    
    return fromJS(source, __filesystem);
};
