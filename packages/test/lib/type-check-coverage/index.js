import {pathToFileURL} from 'node:url';
import {cwd as _cwd} from 'node:process';
import {whenTestsEnds as _whenTestsEnds} from '@putout/printer/type-checker/when-tests-ends';
import {getCoverage as _getCoverage} from '@putout/printer/type-checker/instrument';

export const createGetCoverage = (overrides = {}) => {
    const {
        cwd = _cwd(),
        getCoverage = _getCoverage,
    } = overrides;
    
    const {href} = pathToFileURL(cwd);
    const isOwn = ([name]) => name.includes(href);
    
    return () => new Map(Array
        .from(getCoverage())
        .filter(isOwn));
};

export const whenTestsEnds = (overrides = {}) => {
    const {
        whenTestsEnds = _whenTestsEnds,
    } = overrides;
    
    return whenTestsEnds({
        getCoverage: createGetCoverage(overrides),
    });
};
