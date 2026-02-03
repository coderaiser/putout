import {operator} from 'putout';

const {transformRegExp} = operator;

export const createRegExp = (regexp) => ({
    report: createReport(regexp),
    fix,
    traverse: createTraverse(regexp),
});

const createReport = (regexp) => ({from, to}) => {
    const message = regexp.report();
    return `${message}: '${from}' -> '${to}'`;
};

const fix = ({path, to}) => {
    path.node.pattern = to.slice(1, -1);
    path.node.raw = to;
    path.node.extra.raw = to;
};

export const createTraverse = (regexp) => ({push}) => ({
    RegExpLiteral(path) {
        const from = path.node.extra.raw;
        
        const [to, places] = transformRegExp(from, regexp);
        
        if (!places.length)
            return;
        
        push({
            path,
            from,
            to,
        });
    },
});
