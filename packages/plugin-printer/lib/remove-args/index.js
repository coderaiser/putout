'use strict';

module.exports.report = () => 'Remove useless argument';

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
    'print(__a, __b)': 'print(__b)',
    'print.indent.inc(__args)': 'print.indent.inc()',
    'print.indent.dec(__args)': 'print.indent.dec()',
    
    'write(__a, __b)': 'write(__b)',
});
