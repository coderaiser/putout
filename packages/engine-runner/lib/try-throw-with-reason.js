import {tryCatch} from 'try-catch';

export const tryThrowWithReason = (fn, ...args) => {
    const [error, result] = tryCatch(fn, ...args);
    
    if (error) {
        error.reason ??= 'traverse';
        throw error;
    }
    
    return result;
};
