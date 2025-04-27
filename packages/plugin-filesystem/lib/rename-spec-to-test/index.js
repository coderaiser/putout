import {renameFileByMask} from '../rename-file-by-mask.js';

export const {
    report,
    fix,
    scan,
} = renameFileByMask({
    mask: '*.spec.*',
    from: 'spec',
    to: 'test',
});
