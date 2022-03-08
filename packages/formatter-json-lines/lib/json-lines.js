const {stringify} = JSON;

export default ({name, places, index, count, filesCount, errorsCount}) => {
    const json = stringify({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    return `${json}\n`;
};

