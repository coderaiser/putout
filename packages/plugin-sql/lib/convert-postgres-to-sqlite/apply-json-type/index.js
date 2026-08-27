import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = () => `Use 'IS NOT NULL' instead of '?'`;

export const replace = () => ({
    '[__a, "?", "__b"]': ({__b}) => {
        setLiteralValue(__b, `$.${__b.value}`);
        return 'isNotNull(json_type(__a, "__b"))';
    },
});
