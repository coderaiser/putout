const t = '//"';
const s = `//"`;
/\//
replaceAll('/', '\\/');
replaceAll('\\\\^', '\\^')

const expected = montag`
    __putout_processor_filesystem(["/", ["/index.js", "import \\"./hello\\" from \\"world\\""]]);\n
`;

fixture = fixture
    .replace(/'/g, `\\'`);

if (raw.includes('\\`'))
    return true;

t.report('apply-namespace-to-imported-file', `Use \`import * as dotdot from './b/index.js'\` in '/lib/index.js'`);

