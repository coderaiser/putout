'use strict';

const {operator} = require('putout');
const {compare, remove} = operator;

module.exports.report = () => `Avoid duplicate 'case'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    SwitchStatement: (path) => {
        const cases = path.get('cases');
        
        const {length} = cases;
        let i = length;
        
        while (--i) {
            const current = cases[i].get('test');
            
            for (let j = 0; j < length; j++) {
                const duplicate = cases[j].get('test');
                
                if (j === i)
                    continue;
                
                if (compare(duplicate, current)) {
                    push(current);
                    break;
                }
            }
        }
    },
});
