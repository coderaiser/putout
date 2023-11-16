import {operator} from 'putout';

const {getProperties, __json} = operator;

export const report = () => `Add anchor '#readme' to 'homepage' in package.json`;

export const fix = ({homepage}) => {
    const {raw} = homepage;
    
    homepage.value += '#readme';
    homepage.raw = raw.slice(0, -1) + '#readme' + raw.at(-1);
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __object = path.get('arguments.0');
        
        const {homepagePath} = getProperties(__object, ['homepage']);
        
        if (!homepagePath)
            return false;
        
        const homepage = homepagePath.node.value;
        
        if (homepage.value.includes('#readme'))
            return false;
        
        push({
            path: homepagePath,
            homepage,
        });
    },
});
