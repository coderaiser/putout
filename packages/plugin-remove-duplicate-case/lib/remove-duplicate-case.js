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
