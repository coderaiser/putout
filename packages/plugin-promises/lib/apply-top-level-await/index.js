import {operator} from 'putout';

const {
    replaceWithMultiple,
    compare,
} = operator;

const add = ({push, store}) => (path) => {
    const calleePath = path.get('callee');
    
    if (!store('is-imports') && !store('is-exports'))
        return;
    
    const {id} = calleePath.node;
    
    if (id)
        return;
    
    push(path);
};

export const report = () => `Use top level 'await'`;

export const fix = (path) => {
    const {body} = path.get('callee.body').node;
    replaceWithMultiple(path, body);
};

export const traverse = ({push, store}) => {
    const addPath = add({
        push,
        store,
    });
    
    return {
        'import __ from "__"'() {
            store('is-imports', true);
        },
        ExportNamedDeclaration() {
            store('is-exports', true);
        },
        ExportDefaultDeclaration() {
            store('is-exports', true);
        },
        '(async function __() {})()': (path) => {
            if (!isAsyncParent(path))
                return;
            
            addPath(path);
        },
        '(async () => __)()': (path) => {
            if (!isAsyncParent(path))
                return;
            
            addPath(path);
        },
    };
};

const isInsideUseEffect = (a) => compare(a, 'useEffect(__args)');

function isAsyncParent(path) {
    const {parentPath} = path.parentPath.parentPath;
    
    if (path.find(isInsideUseEffect))
        return false;
    
    return !parentPath;
}
