import * as renameFileWithFn from './rename-file-with-fn.js';
import * as renameFileByMask from './rename-file-by-mask.js';

export const renameFiles = ({type, mask, rename, from, to, near} = {}) => {
    if (rename) {
        const {
            report,
            fix,
            createScan,
        } = renameFileWithFn;
        
        return {
            report,
            fix,
            scan: createScan({
                type,
                mask,
                rename,
            }),
        };
    }
    
    const {
        report,
        fix,
        createScan,
    } = renameFileByMask;
    
    return {
        fix,
        report,
        scan: createScan({
            mask,
            from,
            to,
            near,
        }),
    };
};
