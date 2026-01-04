module.exports = {
    Identifier: ({name}) => {
        write(name);
    },
    NumericLiteral(path, {write}) {
        const {value} = path.node;
        
        write(value);
    },
};
