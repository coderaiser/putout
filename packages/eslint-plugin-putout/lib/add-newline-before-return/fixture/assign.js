function parse() {
    if (!isParenL)
        this.raise(this.start, `After '~' should always go '(' when you use curry`);
    
    node.callee = Identifier('currify');
    node.arguments = [this.parseExpression()];
    return this.finishNode(node, 'CallExpression');
}
