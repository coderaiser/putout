import * as filesystemCLI from '@putout/cli-filesystem';
import * as filesystem from '@putout/operator-filesystem';
import {
    fromJS,
    toJS,
    __filesystem,
} from '@putout/operator-json';
import {isFilesystem} from './is-filesystem.js';
import {maybeFromSimple} from './from-simple.js';

export const create = ({cli = true} = {}) => {
    const branch = createBranch({
        cli,
    });
    
    const merge = createMerge({
        cli,
    });
    
    return {
        branch,
        merge,
    };
};

const createBranch = ({cli}) => (rawSource) => {
    cli && filesystem.init(filesystemCLI);
    
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
