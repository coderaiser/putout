export const filter = (path) => !(path.node && path.node.trailingComments && path.node.trailingComments.length);
