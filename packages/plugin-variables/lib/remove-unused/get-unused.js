const onlyDeclared = ({declared, used}) => declared && !used;

export default (items) => {
    return items.filter(onlyDeclared);
};
