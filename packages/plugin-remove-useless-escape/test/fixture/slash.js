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
    

