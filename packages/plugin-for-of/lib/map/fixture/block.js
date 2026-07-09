const a = list.map((a) => {
    alert('hello');
});

const args = params.map(({id, valtype}) => {
    const param = identifier(id);
    
    param.typeAnnotation = typeAnnotation(valtype);
    
    return param;
});
