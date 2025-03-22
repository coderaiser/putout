import {operator} from 'putout';

const {matchFiles} = operator;

{
    const {
        report,
        fix,
        scan,
    } = matchFiles({
        type: 'module',
        mask: '*.mjs',
        rename(name) {
            return name.replace(/mjs$/, 'js');
        },
    });
    export {
        report,
        fix,
        scan,
    };
}
