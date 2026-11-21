import {createTypeChecker as _createTypeChecker} from '@putout/printer/type-checker';

const typeOptions = {
    instrumentName: 'PUTOUT_INSTRUMENT',
    stackIndex: 4,
};

export const createTypeChecker = (checkers, overrides = {}) => {
    const {
        create = _createTypeChecker,
    } = overrides;
    
    return create(checkers, typeOptions);
};
