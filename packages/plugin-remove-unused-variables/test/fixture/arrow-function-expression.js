module.exports = (panel = DOM.getPanel()) => {
};

module.exports = ({
    link = {},
} = {}) => {
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

const assignment = (callback, query = '') => {
    const url = '';
    DOM.RESTful.write(url + query);
};

const getParser = (parser, hello) => ({
    parse(source) {
        return parser(source);
    }
});

getParser();
