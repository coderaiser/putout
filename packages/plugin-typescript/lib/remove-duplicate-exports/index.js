import {operator} from 'putout';

const {remove} = operator;
const {entries} = Object;

export const report = () => 'Avoid duplicate exports';

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ExportNamedDeclaration(path) {
        const specs = path.get('specifiers');
        const map = {};
        
        for (const spec of specs) {
            const {local} = spec.node;
            
            if (!local)
                continue;
            
            const {name} = local;
            
            map[name] = map[name] || {
                count: 0,
                path: spec,
            };
            
            ++map[name].count;
        }
        
        for (const [, {path, count}] of entries(map)) {
            if (count === 1)
                continue;
            
            push(path);
        }
    },
});
