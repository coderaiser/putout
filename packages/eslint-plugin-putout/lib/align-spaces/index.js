import alignSpaces from 'align-spaces';

const alignedMap = new Map();

export const report = () => 'Keep whitespaces in blank lines';

export const include = () => ['Program'];

export const fix = ({text}) => {
    return alignedMap.get(text);
};

export const filter = ({text}) => {
    const aligned = alignSpaces(text);
    
    if (text === aligned)
        return false;
    
    alignedMap.set(text, aligned);
    
    return true;
};
