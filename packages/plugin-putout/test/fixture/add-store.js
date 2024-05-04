

module.exports.traverse = ({ push }) => ({
    ImportDeclaration(path) {
      const { node } = path;
      const {name} = node.specifiers[0].local;
      store('name', name);
    }
});