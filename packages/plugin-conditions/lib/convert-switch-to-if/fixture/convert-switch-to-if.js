function report(path) {
  switch (path.node.type) {
    case "ImportFinding":
      return "remove unused import: " + path.node.path;

    case "File": {
      const consts = unusedConstNames(path.node);
      if (consts.length > 0) {
        return "remove unused const: " + consts[0];
      }
      break;
    }

    case "BlockStmt": {
      const unused = unusedVarNames(path.node);
      if (unused.length > 0) {
        return "remove unused variable: " + unused[0];
      }
      break;
    }
  }

  return "remove unused variable";
}