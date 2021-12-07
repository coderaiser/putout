const {stringify} = JSON;

export default ({name, source, places, index, count, filesCount, errorsCount}) => {
    const json = stringify({
        name,
        source,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    return `${json}\n`;
};

