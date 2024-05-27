if (this.type === tokTypes.string)
    node.source = this.parseLiteral(this.value);
else if (this.type === tokTypes.name)
    node.source = this.parseLiteral(`'${this.value}'`);
else
    this.unexpected();

if (isIdentifier(node.id)) {
    declare(path, node.id.name);
    isForIn && use(path, node.id.name);
} else if (isObjectPattern(node.id)) {
    idPath.traverse();
} else if (idPath.isArrayPattern()) {}


