async function onChange(a) {
    var b = a.target, e = document.getElementById(target);
    let c = b.value;
    
    type == 'email' && (c = c.split('@')[1]);
    
    var d = await checkDomain(c);
    
    e.innerHTML = `Result: ${d.data}`;
}
