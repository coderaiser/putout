import {operator} from 'putout';

const {setLiteralValue} = operator;
const getValue = ({value}) => value;

export const report = () => `Use 'json_extract()' instead of 'jsonb_extract_path_text()'`;

export const replace = () => ({
    'jsonb_extract_path_text(__args)': ({__args}) => {
        const [, ...list] = __args;
        const values = list.map(getValue);
        
        __args.splice(1, list.length - 1);
        
        setLiteralValue(__args[1], `$.${values.join('.')}`);
        
        return '__json_extract(__args)';
    },
});
