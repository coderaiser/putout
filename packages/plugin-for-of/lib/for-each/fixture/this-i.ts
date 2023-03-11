this.mappings.forEach(function(this: any, mapping: any, i: any) {
    var sliced = mapping.slice(this, start, i);
    if (sliced) {
        newMappings.push(sliced);
    }
}, this)
