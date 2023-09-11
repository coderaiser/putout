context.parserServices;
sourceCode.parserServices;

context.getAncestors(node);
source.getAncestors(node);

context.getDeclaredVariables(node);
source.getDeclaredVariables(node);

context.getScope();
context.getCwd();

context.getSourceCode();
context.markVariableAsUsed(name);
context.getFilename();
context.getPhysicalFilename();
const nextNode = context.getNodeByRangeIndex(node.range[1] + 2)
