import {
    hasTagName,
    getAttributePath,
    getAttributeNode,
    getAttributeValue,
    addAttributeValue,
    addAttribute,
    removeAttributeValue,
    setAttributeValue,
    addClassName,
    getClassName,
    removeClassName,
    containsClassName,
    hasDataName,
    hasAttributeValue,
} from '../lib/jsx.js';

// THROWS Expected 2 arguments, but got 1
hasTagName(5);

// THROWS Expected 2 arguments, but got 1
getAttributePath(5);

// THROWS Expected 2 arguments, but got 1
getAttributeNode(5);

// THROWS Expected 2 arguments, but got 1
getAttributeValue(5);

// THROWS Expected 3 arguments, but got 1
addAttributeValue(5);

// THROWS Expected 3 arguments, but got 1
addAttribute(5);

// THROWS Expected 3 arguments, but got 1
removeAttributeValue(5);

// THROWS Expected 3 arguments, but got 1
setAttributeValue(5);

// THROWS Expected 2 arguments, but got 1
addClassName(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getClassName(5);

// THROWS Expected 2 arguments, but got 1
removeClassName(5);

// THROWS Expected 2 arguments, but got 1
containsClassName(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
hasDataName(5);

// THROWS Expected 2-3 arguments, but got 1
hasAttributeValue(5);
