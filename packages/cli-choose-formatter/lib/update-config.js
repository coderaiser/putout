const {isArray} = Array;

export const updateConfig = ({formatter, chosenFormatter, config}) => {
    const {formatter: currentFormatter} = config;
    const arrayLike = isArray(currentFormatter);
    
    if (arrayLike) {
        const [, options] = currentFormatter;
        config.formatter = [chosenFormatter, options];
    } else {
        config.formatter = chosenFormatter;
        
        if (formatter === chosenFormatter)
            delete config.formatter;
    }
};
