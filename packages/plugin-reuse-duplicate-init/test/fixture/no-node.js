const npmProcess = spawn.sync("npm", ["i", "--save-dev"].concat(packageList),
    { stdio: "inherit" });
const {error} = npmProcess;

