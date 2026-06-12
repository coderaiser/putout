import {types, operator} from 'putout';

const {isImportSpecifier} = types;
const {getBindingPath} = operator;

const checkArgs = ({__args}, path) => {
    if (!__args.length)
        return false;
    
    const {name} = path.node.callee;
    
    const bindingPath = getBindingPath(path, name);
    
    if (!bindingPath)
        return true;
    
    return !isImportSpecifier(bindingPath);
};

export const report = () => 'Remove useless argument';

export const match = () => ({
    'print.newline(__args)': checkArgs,
    'print.space(__args)': checkArgs,
    
    'indent(__args)': checkArgs,
    'indent.inc(__args)': checkArgs,
    'indent.dec(__args)': checkArgs,
    
    'write.indent(__args)': checkArgs,
    'write.indent.inc(__args)': checkArgs,
    'write.indent.dec(__args)': checkArgs,
    
    'write.newline(__args)': checkArgs,
    'write.breakline(__args)': checkArgs,
    'write.space(__args)': checkArgs,
    
    'print.indent(__args)': checkArgs,
    'print.indent.inc(__args)': checkArgs,
    'print.indent.dec(__args)': checkArgs,
});

export const replace = () => ({
    'print.newline(__args)': 'print.newline()',
    'print.breakline(__a)': 'print.breakline()',
    'print.linebreak(__a)': 'print.linebreak()',
    'print.space(__args)': 'print.space()',
    
    'indent(__args)': 'indent()',
    'indent.inc(__args)': 'indent.inc()',
    'indent.dec(__args)': 'indent.dec()',
    
    'write.indent(__args)': 'write.indent()',
    'write.indent.inc(__args)': 'write.indent.inc()',
    'write.indent.dec(__args)': 'write.indent.dec()',
    'write.newline(__args)': 'write.newline()',
    'write.breakline(__args)': 'write.breakline()',
    'write.space(__args)': 'write.space()',
    
    'print.indent(__args)': 'print.indent()',
    'print.indent.inc(__args)': 'print.indent.inc()',
    'print.indent.dec(__args)': 'print.indent.dec()',
    
    'write(__a, __b)': 'write(__b)',
    'maybe.write.space(__a, __b)': 'maybe.write.space(__a)',
    'maybe.write.breakline()': 'write.breakline()',
    'maybe.print.space(__a, __b)': 'maybe.print.space(__a)',
});
