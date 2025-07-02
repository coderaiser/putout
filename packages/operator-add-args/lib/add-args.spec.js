'use strict';

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');

const {addArgs} = require('./add-args.js');

test('putout: operator: add-args: report', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
    `;
    
    const {places} = putout(source, {
        fix: false,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = [{
        message: `Argument 'compare' is missing`,
        position: {
            column: 4,
            line: 2,
        },
        rule: 'add-args',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: add-args', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare}) => {
            compare(a, b);
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: a couple patterns', (t) => {
    const args = {
        compare: ['{compare}', [
            'test("__a", (__args) => __body)',
            'test.only("__a", (__args) => __body)',
        ]],
    };
    
    const source = montag`
        test('', () => {
            compare(a, b);
        });
        
        test.only('', () => {
            compare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare}) => {
            compare(a, b);
        });
        
        test.only('', ({compare}) => {
            compare(a, b);
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: when argument already exist', (t) => {
    const args = {
        compare: ['{compare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', ({compare, comparePlaces}) => {
            compare(a, b);
            comparePlaces(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare, comparePlaces}) => {
            compare(a, b);
            comparePlaces(a, b);
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: rename', (t) => {
    const args = {
        superCompare: ['{compare: superCompare}', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', ({}) => {
            superCompare(a, b);
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', ({compare: superCompare}) => {
            superCompare(a, b);
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: identifier', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', () => {
            t.end();
        });\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', (t) => {
            t.end();
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: options', (t) => {
    const args = {};
    
    const source = montag`
        test('', () => {
            t.end();
        });\n
    `;
    
    const {code} = putout(source, {
        rules: {
            'add-args': ['on', {
                args: {
                    t: ['t', 'test("__a", (__args) => __body)'],
                },
            }],
        },
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        test('', (t) => {
            t.end();
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: has binding', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        test('', (t) => {
            t.end();
        });\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: wrong place', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        const a = () => {
            t();
        };\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: arg exist', (t) => {
    const args = {
        push: ['{push}', [
            'module.exports.traverse = (__args) => __a',
        ]],
    };
    
    const source = montag`
        module.exports.traverse = () => ({
            '__a.replace(/__b/g, __c)': (path, {push}) => {
                push(path);
            },
        });\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: not a function', (t) => {
    const args = {
        t: ['t', 'test("__a", (__args) => __body)'],
    };
    
    const source = montag`
        t();\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['addArgs-undefined-variables', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: second', (t) => {
    const args = {
        indent: ['{indent}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path) => {
            indent.inc();
        };
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path, {indent}) => {
            indent.inc();
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: property', (t) => {
    const args = {
        maybe: ['{maybe}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path, {print}) => {
            maybe.indent(is);
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path, {print, maybe}) => {
            maybe.indent(is);
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: nested block', (t) => {
    const args = {
        maybe: ['{maybe}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path, {print}) => {
            if (a) {
                maybe.indent(is);
            }
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path, {print, maybe}) => {
            if (a) {
                maybe.indent(is);
            }
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: MemberExpression', (t) => {
    const args = {
        maybe: ['{maybe}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path) => {
            if (a) {
                maybe.print.newline(is);
            }
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path, {maybe}) => {
            if (a) {
                maybe.print.newline(is);
            }
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: AssignmentExpression: no', (t) => {
    const args = {
        process: ['{process}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path) => {
            const {PUTOUT_PROGRESS_BAR} = process.env;
            const {stderr} = process;
        };\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: AssignmentExpression', (t) => {
    const args = {
        process: ['{process}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path) => {
            process.env.PUTOUT_PROGRESS_BAR = '0';
        };\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path) => {
            process.env.PUTOUT_PROGRESS_BAR = '0';
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: no transform UnaryExpression', (t) => {
    const args = {
        process: ['{process}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path) => {
            delete process.env.PUTOUT_PROGRESS_BAR;
        };\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: FunctionDeclaration', (t) => {
    const args = {
        maybe: ['{maybe}', 'function __(path, {print}) {}'],
    };
    
    const source = montag`
        function BinaryExpression(path, {print, maybe}) {
            maybe.print(isLogical, '(');
        }\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: VariableDeclaration', (t) => {
    const args = {
        traverse: ['{traverse}', 'const __ = __'],
    };
    
    const source = montag`
        const CallExpression = {
            print(path, {indent, print, maybe}) {
                traverse(path.get('callee'));
            }
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        printer: 'putout',
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        const CallExpression = {
            print(path, {indent, print, maybe, traverse}) {
                traverse(path.get('callee'));
            },
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: call inside call', (t) => {
    const args = {
        store: ['{store}', '__ = __'],
    };
    
    const source = montag`
        module.exports.TSTypeAliasDeclaration = {
            print(path, {print, maybe}) {
                const is = store(isLast(path));
            }
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        printer: 'putout',
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.TSTypeAliasDeclaration = {
            print(path, {print, maybe, store}) {
                const is = store(isLast(path));
            },
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: not call', (t) => {
    const args = {
        process: ['{store}', 'const __ = __'],
    };
    
    const source = montag`
        test('formatter: progress bar: get stream: disable progress bar', async ({notEqual}) => {
            const {PUTOUT_PROGRESS_BAR} = process.env;
        });
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        printer: 'putout',
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = `${source}\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: three args', (t) => {
    const args = {
        maybe: ['{maybe}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path, {print}, semantics) => {
            maybe.indent(is);
        };
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    const expected = montag`
        module.exports.VariableDeclaration = (path, {print, maybe}, semantics) => {
            maybe.indent(is);
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator: add-args: three args: no object', (t) => {
    const args = {
        maybe: ['{maybe}', 'module.exports.__a = (__args) => __body'],
    };
    
    const source = montag`
        module.exports.VariableDeclaration = (path, printer, semantics) => {
            maybe.indent(is);
        };\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: operator: add-args: three args: exclude', (t) => {
    const args = {
        print: [
            '{print}',
            'module.exports.__a = (__args) => __body',
            [
                '(__a, __b, __c, __object) => __body',
            ],
        ],
    };
    
    const source = montag`
        module.exports.printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
            printComment();
            print.breakline();
        };\n
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['add-args', addArgs(args)],
        ],
    });
    
    t.equal(code, source);
    t.end();
});
