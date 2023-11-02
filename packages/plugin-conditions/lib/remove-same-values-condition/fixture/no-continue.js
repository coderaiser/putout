for (const [i, el] of entries(elements)) {
    if (el !== path) {}
    
    if (!Number(i) && n) {
        path.parentPath.node.elements[i] = null;
        break;
    }
    
    if (el === path) {
        path.remove();
        break;
    }
}
