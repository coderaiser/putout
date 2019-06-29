for (const mapping: any of this.mappings) {
    var sliced = mapping.slice(this, start, end);
    if (sliced) {
        newMappings.push(sliced);
    }
}
