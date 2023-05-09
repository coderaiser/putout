'use strict';

const checkArgs = ({__args}) => __args.length;

module.exports.report = () => 'Remove useless argument';

module.exports.match = () => ({
    'print.newline(__args)': checkArgs,
    'print.space(__args)': checkArgs,
    
    'indent(__args)': checkArgs,
    'indent.inc(__args)': checkArgs,
    'indent.dec(__args)': checkArgs,
    
    'write.indent(__args)': checkArgs,
    'write.indent.inc(__args)': checkArgs,
    'write.indent.dec(__args)': checkArgs,
    
    'print.indent(__args)': checkArgs,
    'print.indent.inc(__args)': checkArgs,
    'print.indent.dec(__args)': checkArgs,
});

module.exports.replace = () => ({
    'print.newline(__args)': 'print.newline()',
    'print.space(__args)': 'print.space()',
    
    'indent(__args)': 'indent()',
    'indent.inc(__args)': 'indent.inc()',
    'indent.dec(__args)': 'indent.dec()',
    
    'write.indent(__args)': 'write.indent()',
    'write.indent.inc(__args)': 'write.indent.inc()',
    'write.indent.dec(__args)': 'write.indent.dec()',
    
    'print.indent(__args)': 'print.indent()',
    'print.indent.inc(__args)': 'print.indent.inc()',
    'print.indent.dec(__args)': 'print.indent.dec()',
    
    'write(__a, __b)': 'write(__b)',
    'print(__a, __b)': 'print(__b)',
    'maybe.write.space(__a, __b)': 'maybe.write.space(__a)',
});
