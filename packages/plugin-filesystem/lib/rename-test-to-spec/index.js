import {renameFileByMask} from '../rename-file-by-mask.js';

const {
    report,
    fix,
    scan,
} = renameFileByMask({
    mask: '*.test.*',
    from: 'test',
    to: 'spec',
});

export {
    report,
    fix,
    scan,
};
