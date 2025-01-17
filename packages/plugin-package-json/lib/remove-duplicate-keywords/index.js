import {operator} from 'putout';

const {
    getProperties,
    __json,
    remove,
} = operator;

export const report = () => `Remove duplicate keywords`;

export const fix = (path) => {
    remove(path);
};
export const traverse = ({push}) => ({
    [__json](path) {
        const objectPath = path.get('arguments.0');
        const {keywordsPath} = getProperties(objectPath, ['keywords']);
        
        if (!keywordsPath)
            return;
        
        const arrayPath = keywordsPath.get('value');
        
        if (!arrayPath.node.elements.length)
            return;
        
        let first = arrayPath.get('elements.0');
        do {
            let second = arrayPath.get('elements.0');
            do {
                if (first === second)
                    continue;
                
                if (first.node.value === second.node.value)
                    push(second);
            } while (second = next(second));
        } while (first = next(first));
    },
});

function next(path) {
    path = path.getNextSibling();
    
    if (path.node)
        return path;
    
    return null;
}
