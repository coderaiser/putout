class Fn {
    constructor(
        @Inject('SNIPPETS') private readonly snippets: Map<string, Snippet>
    ) {}
};

class A {
    constructor(
        private readonly snippets: Map<string, Snippet>
    ) {}
};
