import exec from 'execon';

module.exports.exec = exec;
module.exports.time = (name) => {
    exec.ifExist(console, 'time', [name]);
};
