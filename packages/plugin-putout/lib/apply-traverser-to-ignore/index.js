export const report = () => `Use 'Traverser' instead of 'Replacer'`;

const getName = ({key}) => key.name;
const TRAVERSER = new Set([
    'report',
    'fix',
    'traverse',
]);

export const match = () => ({
    'export const __object = ignore(__args)': ({__object}) => {
        const names = new Set(__object.properties.map(getName));
        const diff = TRAVERSER.difference(names);
        
        return diff.size;
    },
});

export const replace = () => ({
    'export const __object = ignore(__args)': 'export const {report, fix, traverse} = ignore(__args)',
});
