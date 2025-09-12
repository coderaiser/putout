import {
    template,
    types,
    operator,
} from 'putout';

const {
    remove,
    rename,
    insertBefore,
    getPathAfterImports,
} = operator;

const {
    isVariableDeclaration,
    expressionStatement,
    objectProperty,
    identifier,
} = types;
const {entries} = Object;

const createHoisted = template('const hoisted = vi.hoisted({})');
const createMockClear = template('NAME.mockClear();');
const createBeforeEach = template('beforeEach(() => {})');

export const report = () => `Use 'vi.hoisted()'`;

export const fix = ({path, names}) => {
    const hoistedNode = createHoisted();
    const beforeEach = createBeforeEach();
    
    const [object] = hoistedNode.declarations[0].init.arguments;
    const {body} = beforeEach.arguments[0].body;
    
    for (const name of names) {
        const key = identifier(name);
        const value = template.ast('vi.fn()');
        const property = objectProperty(key, value);
        
        object.properties.push(property);
        body.push(expressionStatement(createMockClear({
            NAME: name,
        })));
    }
    
    const afterImportsPath = getPathAfterImports(path.get('body'));
    
    insertBefore(afterImportsPath, hoistedNode);
    insertBefore(afterImportsPath, expressionStatement(beforeEach));
};

export const traverse = ({push}) => ({
    Program(path) {
        const names = [];
        
        for (const [name, binding] of entries(path.scope.bindings)) {
            const {parentPath} = binding.path;
            
            if (!isVariableDeclaration(parentPath))
                continue;
            
            if (parentPath.node.declarations[0].init)
                continue;
            
            rename(path, name, `hoisted.${name}`);
            remove(binding.path);
            names.push(name);
        }
        
        if (names.length)
            push({
                path,
                names,
            });
    },
});
