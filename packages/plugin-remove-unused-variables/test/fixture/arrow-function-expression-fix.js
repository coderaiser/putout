module.exports = () => {};

module.exports = ({link = {}} = {}) => {
    return {
        link,
    };
};

terminal.on('key', (char, {keyCode: key}) => {
    if (key === 27)
        return;
});

terminal.on('key', (char, {absent} = {}) => {
    return absent;
});

const getParser = (parser) => ({
    parse(source) {
        return parser(source);
    },
});

getParser();
