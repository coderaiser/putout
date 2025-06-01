import {types} from 'putout';
import {tokTypes as tt} from '../operator/index.js';

const {
    VariableDeclaration,
    VariableDeclarator,
} = types;

export default function keywordExportNoConst(Parser) {
    if (this.shouldParseExportStatement()) {
        if (node.declaration.type === 'ExpressionStatement')
            node.declaration = VariableDeclaration('const', [
                VariableDeclarator(node.declaration.expression.left, node.declaration.expression.right),
            ]);
    }
}

