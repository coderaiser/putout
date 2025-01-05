import codeframe from '@putout/formatter-codeframe';

const {round} = Math;

export default ({name, places, index, count, filesCount, source, errorsCount}) => {
    const naturalIndex = index + 1;
    const str = `\r${progress(naturalIndex, count)}%`;
    
    const result = codeframe({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
        source,
    });
    
    if (naturalIndex === count)
        return `${str}\r${result}`;
    
    return str;
};

const progress = (index, count) => round(index / count * 100);
