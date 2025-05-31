export const report = () => 'Avoid useless conditions';

export const match = () => ({
    'if (__a) __b': (vars, path) => {
        const testPath = path.get('test');
        const {confident} = testPath.evaluate();
        
        return confident;
    },
});

export const replace = () => ({
    'if (__a) __b': (vars, path) => {
        const testPath = path.get('test');
        const {value} = testPath.evaluate();
        
        if (!value)
            return '';
        
        return '__b';
    },
});
