import {operator} from 'putout';

const {matchFiles} = operator;

{
    const {
        report,
        fix,
        scan,
    } = matchFiles({
        '*.cjs': plugin,
    });
    
    export {
        report,
        fix,
        scan,
    };
}
