import {types} from 'putout';

const {stringLiteral} = types;

export const report = () => `Use 'jsonb_extract_path_text()' instead of 'jsonb_extract()'`;

export const replace = () => ({
    'json_extract(__args)': ({__args}) => {
        const [, joined] = __args;
        const values = joined.value
            .slice(2)
            .split('.');
        
        __args.pop();
        
        for (const value of values) {
            __args.push(stringLiteral(value));
        }
        
        return 'jsonb_extract_path_text(__args)';
    },
});
