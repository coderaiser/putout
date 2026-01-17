import {types, template} from 'putout';

const {isTemplateLiteral} = types;

export const report = () => `Use '.startsWith()' instead of '.test()'`;

export const match = () => ({
    'RegExp(__a).test(__b)': ({__a}) => {
        if (isTemplateLiteral(__a)) {
            const [{value}] = __a.quasis;
            
            if (!value.cooked.startsWith('^'))
                return false;
            
            for (const {value} of __a.quasis)
                if (value.cooked.includes('*'))
                    return false;
        }
        
        return true;
    },
    '/__a/.test(__b)': ({__a}) => {
        let raw = __a.raw.slice(1, -1);
        
        if (!raw.startsWith('^'))
            return false;
        
        raw = raw
            .replaceAll('\\.', '')
            .replaceAll('\\(', '')
            .replaceAll('\\)', '');
        
        return !/[$+({*\].]/.test(raw);
    },
});

const buildStartsWith = template('LINE.startsWith(PART)');

export const replace = () => ({
    'RegExp(__a).test(__b)': ({__a, __b}) => {
        if (isTemplateLiteral(__a)) {
            const [{value}] = __a.quasis;
            
            value.cooked = value.cooked.slice(1);
            value.raw = value.cooked.slice(1);
            
            return buildStartsWith({
                LINE: __b,
                PART: __a,
            });
        }
        
        return `__b.startsWith(__a)`;
    },
    '/__a/.test(__b)': ({__a}) => {
        const str = __a.raw
            .slice(1, -1)
            .replaceAll('\\n', '\\\\n')
            .replace('^', '');
        
        return `__b.startsWith('${str}')`;
    },
});
