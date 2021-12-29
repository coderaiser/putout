'use strict';

const {findProperties} = require('putout').operator;
const parseName = (a) => a.value.replace('@putout/', '');

module.exports.report = () => 'Set homepage';

module.exports.traverse = ({push}) => ({
    '__putout_processor_json(__a)': (path) => {
        const __aPath = path.get('arguments.0');
        const {namePath, homepagePath} = findProperties(__aPath, [
            'name',
            'homepage',
        ]);
        
        if (!namePath || !homepagePath)
            return;
        
        const name = namePath.node.value;
        const homepage = homepagePath.node.value;
        
        if (!/^@putout/.test(name.value))
            return;
        
        if (name.value.includes('codemod'))
            return;
        
        if (name.value.includes('rule'))
            return;
        
        const dir = parseName(name);
        
        if (homepage.value.includes(dir))
            return;
        
        push({
            name,
            path: homepagePath,
            homepage,
        });
    },
});

module.exports.fix = ({name, homepage}) => {
    const dir = parseName(name);
    homepage.value = `https://github.com/coderaiser/putout/tree/master/packages/${dir}`;
};

