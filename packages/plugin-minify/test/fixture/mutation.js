async function onChange(event) {
    const element = event.target
    const target = element.dataset.resultElement


    let domain = element.value

    if (type == "email") {
        domain = domain.split("@")[1]
    }

    const result = await checkDomain(domain)

    const targetElement = document.getElementById(target)
    targetElement.innerHTML = `Result: ${result.data}`
}
