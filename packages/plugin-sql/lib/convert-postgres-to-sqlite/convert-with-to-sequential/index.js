import {types} from 'putout';

const {
    stringLiteral,
    callExpression,
    identifier,
} = types;

export const report = () => `Use sequential queries instead of 'WITH'`;
export const include = () => [
    'withNamed(__args)',
];

export const fix = (path) => {
    const args = path.node.arguments;
    const namedQueries = args.slice(0, -1);
    const finalStatement = args.at(-1);
    
    const aliases = new Map(namedQueries.map((node) => [node.left.name, `${node.left.name}_id`]));
    
    const rewriteReferences = (node) => {
        for (const arg of node.arguments) {
            if (arg.type === 'CallExpression' && arg.callee.name === 'from') {
                const [fromArg] = arg.arguments;
                
                const alias = aliases.get(fromArg.name);
                
                if (alias)
                    arg.arguments[0] = stringLiteral(`:${alias}`);
            }
            
            if (arg.arguments)
                rewriteReferences(arg);
        }
    };
    
    rewriteReferences(finalStatement);
    
    const statements = [
        ...namedQueries.map((node) => {
            const alias = aliases.get(node.left.name);
            const insertNode = node.right;
            
            rewriteReferences(insertNode);
            
            const returningIdx = insertNode.arguments.findIndex((a) => a.callee?.name === 'returning');
            
            if (returningIdx >= 0) {
                const returningNode = insertNode.arguments[returningIdx];
                
                returningNode.arguments = [
                    callExpression(identifier('as'), [
                        identifier('id'),
                        stringLiteral(alias),
                    ]),
                ];
            }
            
            return insertNode;
        }),
        finalStatement,
    ];
    
    const arrayPath = path.parentPath;
    const index = arrayPath.node.elements.indexOf(path.node);
    
    arrayPath.node.elements.splice(index, 1, ...statements);
};
