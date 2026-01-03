import {tryCatch} from 'try-catch';

export const secondChance = (fn, source, messages, args) => {
    const [a, ...others] = args;
    const [errorA, resultA] = tryCatch(fn, source, a);
    
    if (!errorA)
        return resultA;
    
    if (checkError(errorA, messages))
        throw errorA;
    
    for (const b of others) {
        const [errorB, resultB] = tryCatch(fn, source, b);
        
        if (!errorB)
            return resultB;
    }
    
    throw errorA;
};

function checkError(error, messages) {
    for (const message of messages) {
        if (error.message.includes(message))
            return true;
    }
    
    return false;
}
