import {createTypeChecker as _createTypeChecker} from '@putout/printer/type-checker';

const typeOptions = {
    instrumentName: 'PUTOUT_INSTRUMENT',
};

export const createTypeChecker = (checkers, overrides = {}) => {
    const {
        create = _createTypeChecker,
    } = overrides;
    
    return create(checkers, typeOptions);
};
