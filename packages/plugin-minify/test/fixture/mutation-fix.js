async function a(A) {
    let b = A.target;
    
    let c = b.value;
    
    type == 'email' && (c = c.split('@')[1]);
    
    let d = await checkDomain(c);
    
    let e = document.getElementById(b.dataset.resultElement);
    
    e.innerHTML = `Result: ${d.data}`;
}
