async function a(A) {
   const b = A.target, e = document.getElementById(b.dataset.resultElement);

    let c = b.value;

    type == 'email' && (c = c.split('@')[1]);

   const d = await checkDomain(c);

    e.innerHTML = `Result: ${d.data}`;
}
