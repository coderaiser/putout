import {operator} from 'putout';

const {remove} = operator;

const isLoop = (path) => path.isLoop() || path.parentPath.isLoop();

export const report = () => `Avoid useless 'continue'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ContinueStatement(path) {
        const {parentPath} = path;
        
        if (!isLoop(parentPath))
            return;
        
        if (parentPath.get('body') === path) {
            push(path);
            return;
        }
        
        if (parentPath.isBlockStatement()) {
            push(path);
            return;
        }
    },
});
