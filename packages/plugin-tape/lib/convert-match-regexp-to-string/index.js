import {operator} from 'putout';

const {isSimpleRegExp} = operator;
const checkRegExp = ({__b}) => isSimpleRegExp(RegExp(__b.pattern));
const checkStr = ({__b}) => isSimpleRegExp(RegExp(__b.value));

export const report = () => 't.match should be used with string pattern';

export const match = () => ({
    't.match(__a, RegExp(__b))': checkStr,
    't.match(__a, RegExp(__b), __c)': checkStr,
    't.match(__a, /__b/)': checkRegExp,
    't.match(__a, /__b/, __c)': checkRegExp,
    't.notMatch(__a, RegExp(__b))': checkStr,
    't.notMatch(__a, RegExp(__b), __c)': checkStr,
    't.notMatch(__a, /__b/)': checkRegExp,
    't.notMatch(__a, /__b/, __c)': checkRegExp,
});

export const replace = () => ({
    't.match(__a, RegExp(__b))': 't.match(__a, __b)',
    't.match(__a, RegExp(__b), __c)': 't.match(__a, __b, __c)',
    't.match(__a, /__b/)': ({__b}) => `t.match(__a, '${__b.pattern}')`,
    't.match(__a, /__b/, __c)': ({__b}) => `t.match(__a, '${__b.pattern}', __c)`,
    't.notMatch(__a, RegExp(__b))': 't.notMatch(__a, __b)',
    't.notMatch(__a, RegExp(__b), __c)': 't.notMatch(__a, __b, __c)',
    't.notMatch(__a, /__b/)': ({__b}) => `t.notMatch(__a, '${__b.pattern}')`,
    't.notMatch(__a, /__b/, __c)': ({__b}) => `t.notMatch(__a, '${__b.pattern}', __c)`,
});
