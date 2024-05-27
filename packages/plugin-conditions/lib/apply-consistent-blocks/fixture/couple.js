if (this.type === tokTypes.string) {
    node.source = this.parseLiteral(this.value);
} else if (this.type === tokTypes.name)
    node.source = this.parseLiteral(`'${this.value}'`);
else
    this.unexpected();
