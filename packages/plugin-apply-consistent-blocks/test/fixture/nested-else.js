if (isIdentifier(node.id)) {
    declare(path, node.id.name);
    isForIn && use(path, node.id.name);
} else if (isObjectPattern(node.id)) {
    fn();
}
