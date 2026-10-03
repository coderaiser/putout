if ((isMaxArgs(path, semantics) || isMultiline(path, semantics)) && (n || isMaxArgs(path, semantics))) {}
if ((isMaxArgs(path, semantics) || isMultiline(path, semantics)) && (isMaxArgs(path, semantics) || n)) {}
    
if (isMaxArgs(path, semantics) || isMultiline(path, semantics) && (isMaxArgs(path, semantics) || n)) {}
if (isMaxArgs(path, semantics) || isMultiline(path, semantics) && (n || (isMaxArgs(path, semantics)))) {}

if ((a || b) && (b || c)) {}
if ((a || b) && (c || b)) {}
if (a || b && (b || c)) {}
if (a || b && (c || b)) {}
