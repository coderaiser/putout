import {renameFileByMask} from '../rename-file-by-mask.js';

export const {
    report,
    fix,
    scan,
} = renameFileByMask({
    mask: '*.test.*',
    from: 'test',
    to: 'spec',
});
