this.mappings.forEach(function(this: any, mapping: any) {
    var sliced = mapping.slice(this, start, end);
    if (sliced) {
        newMappings.push(sliced);
    }
}, this)
