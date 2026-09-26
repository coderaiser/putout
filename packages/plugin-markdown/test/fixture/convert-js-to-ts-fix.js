__putout_processor_markdown([
    codeblock('ts', 'const a: string[] = [];'),
    codeblock('ts', 'interface Foo {\n    a: string;\n}'),
    codeblock('ts', 'type X = string;'),
    codeblock('js', 'const plain = [1, 2];'),
    codeblock('js', 'const o = {a: 1};'),
    codeblock('js', 'const broken = '),
    codeblock('ts', 'const already: string = "x";'),
    codeblock('bash', 'echo hi'),
]);
