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

