function report(path) {
  switch (path.node.type) {
    case "ImportFinding":
      console.log("remove unused import: " + path.node.path);

  }

  return "remove unused variable";
}
