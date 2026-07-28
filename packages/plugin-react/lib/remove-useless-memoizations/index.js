import {template} from 'putout';

const createDeclaration = template('const ID = INIT');

export const report = () => `Avoid memo functions when react compiler activated`;

export const replace = () => ({
    'const __a = useMemo(() => __body, __)': ({__body, __a}) => {
        const {body} = __body;
        const {argument} = body.at(-1);
        
        body.pop();
        body.push(createDeclaration({
            ID: __a,
            INIT: argument,
        }));
        
        return __body;
    },
    'const __a = useMemo(() => __b, __)': 'const __a = __b',
    'useCallback(__a, __b)': '__a',
    'memo(__a)': '__a',
    'React.memo(__a)': '__a',
});
