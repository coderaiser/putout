export {};
export const NumericLiteral = () => {
    const {value} = path.node;
    
    write(value);
};
