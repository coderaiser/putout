{
    const a = [];
    
    for (const a of list) {
        alert('hello');
    }
}
{
    const args = [];
    
    for (const {id, valtype} of params) {
        const param = identifier(id);
        
        param.typeAnnotation = typeAnnotation(valtype);
        
        args.push(param);
    }
}
