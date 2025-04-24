'use strict';

const process = require('node:process');
const tryCatch = require('try-catch');

const isUpdate = () => Boolean(Number(process.env.UPDATE));
const TS = {
    ENABLED: true,
    DISABLED: false,
};

module.exports.readFixture = (name, extension) => {
    const {readFileSync} = global.__putout_test_fs;
    const [eTS, dataTS] = tryCatch(readFileSync, `${name}.ts`, 'utf8');
    
    if (!eTS)
        return [
            dataTS,
            TS.ENABLED,
            'ts',
        ];
    
    const [eJS, dataJS] = tryCatch(readFileSync, `${name}.js`, 'utf8');
    
    if (!eJS)
        return [
            dataJS,
            TS.DISABLED,
            'js',
        ];
    
    if (extension) {
        const [e, data] = tryCatch(readFileSync, `${name}.${extension}`, 'utf8');
        
        if (!e)
            return [
                data,
                TS.DISABLED,
                extension,
            ];
    }
    
    throw eJS;
};

module.exports.writeFixFixture = ({full, code, extension}) => {
    const {writeFileSync} = global.__putout_test_fs;
    writeFileSync(`${full}-fix.${extension}`, code);
};

module.exports.writeFixture = ({full, code, extension}) => {
    const {writeFileSync} = global.__putout_test_fs;
    writeFileSync(`${full}.${extension}`, code);
};

module.exports.rmFixture = (name, extension) => {
    const {unlinkSync} = global.__putout_test_fs;
    
    if (!isUpdate())
        return;
    
    tryCatch(unlinkSync, `${name}.js`);
    tryCatch(unlinkSync, `${name}.ts`);
    tryCatch(unlinkSync, `${name}.${extension}`);
};
