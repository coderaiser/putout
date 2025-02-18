import {
    parse,
    print,
    operator,
    types,
} from 'putout';

{
    const {replaceWith} = operator;
}
traverse(filesystem, {
    StringLiteral(path) {
        if (isIdentifier(path.node.id, {name: 'b'}))
            replaceWith(path, NumericLiteral(5));
    },
});
