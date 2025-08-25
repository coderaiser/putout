async function onChange(a) {
    var b = a.target, c = b.value, e = document.getElementById(target);
    
    type == 'email' && (c = c.split('@')[1]);
    
    var d = await checkDomain(c);
    
    e.innerHTML = `Result: ${d.data}`;
}
