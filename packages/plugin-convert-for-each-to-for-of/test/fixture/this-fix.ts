for (const mapping of this.mappings) {
    var sliced = mapping.slice(this, start, end);
    if (sliced) {
        newMappings.push(sliced);
    }
}
