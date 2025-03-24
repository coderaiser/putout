import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `"run" should be called instead of "series"`;

export const traverse = ({push}) => ({
    CallExpression(path) {
        if (!isIdentifier(path.node.callee, {name: 'series'}))
            return;
        
        push(path);
    },
});

export const fix = (path) => {
    path.node.callee.name = 'run';
};
