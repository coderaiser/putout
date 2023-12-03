async function a(A) {
    var b = A.target, e = document.getElementById(b.dataset.resultElement);
    
    let c = b.value;
    
    type == 'email' && (c = c.split('@')[1]);
    
    var d = await checkDomain(c);
    
    e.innerHTML = `Result: ${d.data}`;
}
