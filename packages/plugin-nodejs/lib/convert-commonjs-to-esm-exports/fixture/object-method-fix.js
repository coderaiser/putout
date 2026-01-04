export {};
export const Identifier = ({name}) => {
    write(name);
};
export const NumericLiteral = (path, {write}) => {
    const {value} = path.node;
    
    write(value);
};
