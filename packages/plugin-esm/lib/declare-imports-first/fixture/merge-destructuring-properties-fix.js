import {types} from 'putout';
import {tokTypes as tt} from '../operator/index.js';

const {variableDeclarator} = types;
const {variableDeclaration} = types;

const {
    VariableDeclaration,
    VariableDeclarator,
} = types;

export default function keywordExportNoConst(Parser) {
    if (this.shouldParseExportStatement()) {
        if (node.declaration.type === 'ExpressionStatement')
            node.declaration = variableDeclaration('const', [
                variableDeclarator(node.declaration.expression.left, node.declaration.expression.right),
            ]);
    }
}
