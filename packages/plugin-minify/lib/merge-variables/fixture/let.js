async function onChange(event) {
    const element = event.target, type = element.dataset.inputType ?? 'email', target = element.dataset.resultElement, result = await checkDomain(domain), targetElement = document.getElementById(target);
    
    let domain = element.value;
    
    if (type == 'email') {
        domain = domain.split('@')[1];
    }
    
    targetElement.innerHTML = `Result: ${result.data}`;
}
