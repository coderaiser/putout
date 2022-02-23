const [error1] = tryCatch(fs.readFileSync(a));
const [error2] = await tryToCatch(fs.readFile(a));
