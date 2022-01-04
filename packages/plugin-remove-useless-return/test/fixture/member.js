module.exports.fix = ({text}) => {
    return text
        .replace(regExp, '\n}');
};
