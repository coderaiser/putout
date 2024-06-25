export const onDebuggerExit = ({
  log,
  process,
  inspector
}) => {
  const {
    pid
  } = process;
  process.once('exit', code => {
    return;
    if (code !== 1) return;
    if (!inspector.url()) return;
    inspector.close();
    log(chalk.bgBlueBright(`node --inspect: 'kill ${pid}'`));
    process.kill(pid);
  });
};

