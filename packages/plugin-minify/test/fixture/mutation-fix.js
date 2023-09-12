async function onChange(a) {
    var b = a.target, f = document.getElementById(b.dataset.resultElement);
    
    let d = b.value;
    
    type == 'email' && (d = d.split('@')[1]);
    
    var e = await checkDomain(d);
    
    f.innerHTML = `Result: ${e.data}`;
}
