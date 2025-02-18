import {
    parse,
    print,
    operator,
    types,
} from 'putout';

traverse(filesystem, {
    StringLiteral(path) {
        if (isIdentifier(path.node.id, {name: 'b'}))
            path.replaceWith(NumericLiteral(5));
    },
});
