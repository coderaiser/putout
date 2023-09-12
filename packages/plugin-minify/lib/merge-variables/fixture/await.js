async function onChange(a) {
    var b = a.target;
    let c = b.value;

    type == 'email' && (c = c.split('@')[1]);

    var d = await checkDomain(c);
    var e = document.getElementById(target);

    e.innerHTML = `Result: ${d.data}`;
}
