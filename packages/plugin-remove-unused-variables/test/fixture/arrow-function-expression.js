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

const assignment = (callback, query = '') => {
    const url = '';
    DOM.RESTful.write(url + query);
};

