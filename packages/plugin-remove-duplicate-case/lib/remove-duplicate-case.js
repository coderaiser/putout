import {operator} from 'putout';

const {compare, remove} = operator;

export const report = () => `Avoid duplicate 'case'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    SwitchStatement: (path) => {
        const cases = path.get('cases');
        
        const {length} = cases;
        let i = length;
        
        while (--i) {
            const current = cases[i].get('test');
            
            for (let j = 0; j < length; j++) {
                if (j === i)
                    continue;
                
                const currentCase = cases[j].node;
                
                if (!currentCase)
                    continue;
                
                const duplicate = currentCase.test;
                
                if (compare(duplicate, current)) {
                    push(current);
                    break;
                }
            }
        }
    },
});
