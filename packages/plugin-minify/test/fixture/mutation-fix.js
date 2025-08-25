async function a(A) {
    let b = A.target, c = b.value, e = document.getElementById(b.dataset.resultElement);
    
    type == 'email' && (c = c.split('@')[1]);
    
    let d = await checkDomain(c);
    
    e.innerHTML = `Result: ${d.data}`;
}
