'use strict';

module.exports.report = () => `Suffix "legacy" should be avoided`;

module.exports.fix = ({nameNode}) => {
    nameNode.value = nameNode.value.replace('/legacy', '');
};

module.exports.traverse = ({push}) => {
    return {
        'require("__")'(path) {
            const [nameNode] = path.node.arguments;
            
            if (!nameNode.value.includes('/legacy'))
                return;
            
            push({
                path,
                nameNode,
            });
        },
    };
};

