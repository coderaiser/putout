function mm() {
    let result = 'const {\n';
    
    for (const {imported} of __imports) {
        result += `${imported.name},`;
    }
    
    result += `\n} = require(${__a.raw});`;
    
    return result;
}
