class Fn {
    constructor(
        @Inject('SNIPPETS') private readonly snippets: Map<string, Snippet>
    ) {}
};
