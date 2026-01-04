module.exports = {
    NumericLiteral(path, {write}) {
        const {value} = path.node;
        
        write(value);
    },
};
