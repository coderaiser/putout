import {template, operator} from 'putout';

const {insertBefore} = operator;

export const report = () => 'try-catch should be used instead of t.throws';

export const replace = () => ({
    't.throws(__a, __b)': ({__a}, path) => {
        putTryCatch(__a, path);
        return `t.ok(error, __b)`;
    },
    't.throws(__a, __b, __c)': ({__a, __b}, path) => {
        putTryCatch(__a, path);
        return `t.equal(error.message, '${__b.pattern}', __c)`;
    },
});

function putTryCatch(__a, path) {
    const tryCatchNode = template.ast.fresh(`
        const [error] = tryCatch(__a)
    `);
    
    tryCatchNode.declarations[0].init.arguments[0] = __a;
    
    insertBefore(path, tryCatchNode);
}
