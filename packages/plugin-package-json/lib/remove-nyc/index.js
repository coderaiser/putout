import {operator} from 'putout';

const {
    remove,
    getProperties,
    __json,
} = operator;

export const report = () => `Remove 'nyc' section of 'package.json', use file '.nycrc.json' instead`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {nycPath} = getProperties(__aPath, ['nyc']);
        
        if (!nycPath)
            return;
        
        push(nycPath);
    },
});
