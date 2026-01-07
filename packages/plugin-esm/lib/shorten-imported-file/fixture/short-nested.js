__putout_processor_filesystem([
    '/',
    '/hello/',
    '/hello/rename-file/',
    ['/hello/rename-file/index.js', `
        import {renameFileByMask} from "../rename-file-by-mask.js";
    `],
]);
