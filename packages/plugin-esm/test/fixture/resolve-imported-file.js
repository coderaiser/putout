__putout_processor_filesystem([
    '/',
    '/lib/',
    ['/lib/index.js', `
        import a from "./a";
        import b from "./b";
        import e from "../e";
        import fs from "fs";
        import c from "./c.js";
        import d from "./d.mjs";
        import cjs from "./e.cjs";
        import dotdot from '..';
    `],
    ['/lib/a.js', `export default 5\\n`],
    '/lib/b/',
    ['/lib/b/index.js', 'export default 7\\n'],
    ['/package.json', '{"main": "lib/index.js"}'],
]);