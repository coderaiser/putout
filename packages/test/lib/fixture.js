import process from 'node:process';
import {tryCatch} from 'try-catch';

const isUpdate = () => Boolean(Number(process.env.UPDATE));
const TS = {
    ENABLED: true,
    DISABLED: false,
};

export const readFixture = (name, extension) => {
    const {readFileSync} = globalThis.__putout_test_fs;
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

export const writeFixFixture = ({full, code, extension}) => {
    const {writeFileSync} = globalThis.__putout_test_fs;
    writeFileSync(`${full}-fix.${extension}`, code);
};

export const writeFormatFixture = (full, code) => {
    const {writeFileSync} = globalThis.__putout_test_fs;
    writeFileSync(`${full}-format`, code);
};

export const readFormatFixture = (full) => {
    const {readFileSync} = globalThis.__putout_test_fs;
    return readFileSync(`${full}-format`, 'utf8');
};

export const writeFixture = ({full, code, extension}) => {
    const {writeFileSync} = globalThis.__putout_test_fs;
    writeFileSync(`${full}.${extension}`, code);
};

export const rmFixture = (name, extension) => {
    const {unlinkSync} = globalThis.__putout_test_fs;
    
    if (!isUpdate())
        return;
    
    tryCatch(unlinkSync, `${name}.js`);
    tryCatch(unlinkSync, `${name}.ts`);
    tryCatch(unlinkSync, `${name}.${extension}`);
};
