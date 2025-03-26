import {renameFileByMask} from '../rename-file-by-mask.js';

const {
    report,
    fix,
    scan,
} = renameFileByMask({
    mask: '*.spec.*',
    from: 'spec',
    to: 'test',
});

export {
    report,
    fix,
    scan,
};
