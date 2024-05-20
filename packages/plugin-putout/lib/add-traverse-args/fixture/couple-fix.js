export const traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        
        if (value === './index.js') {
            push(path);
            return;
        }
        
        if (value === '../lib/index.js')
            push(path);
    },
});
