const nodeTypes = Array.isArray(matcher.nodeType)
    ? matcher.nodeType
    : matcher.nodeType
    ? [matcher.nodeType]
    : ['Node']
