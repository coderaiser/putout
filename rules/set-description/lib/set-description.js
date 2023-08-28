import {operator} from 'putout';

const {getProperties} = operator;

export const report = () => 'Set 🐊 in description';

export const traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        
        const {descriptionPath} = getProperties(__aPath, ['description']);
        
        if (!descriptionPath)
            return;
        
        const description = descriptionPath.node.value;
        
        if (!description.value.startsWith('putout'))
            return;
        
        push(descriptionPath);
    },
});

export const fix = (path) => {
    path.node.value.value = path.node.value.value.replace('putout', '🐊Putout');
    path.node.value.raw = path.node.value.raw.replace('putout', '🐊Putout');
};
