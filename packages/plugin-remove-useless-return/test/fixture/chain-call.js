module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('{', '{\n')
        .replace('}', '\n}')
        .replace(/\n\s*?\n/g, '\n');
};
