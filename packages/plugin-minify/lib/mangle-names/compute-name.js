'use strict';

const BIG_A = 65;
const BIG_Z = 90;
const SMALL_A = 97;

module.exports.computeName = ({index, all, uid}) => {
    const [is, name] = generate({
        index,
        all,
    });
    
    if (is)
        return name;
    
    const shortName = uid.replace('_temp', 't');
    
    if (!all[shortName])
        return shortName;
    
    const dashedShortName = uid.replace('temp', 't');
    
    if (!all[dashedShortName])
        return dashedShortName;
    
    return uid;
};

function generate({index, all}) {
    const big = index + BIG_A;
    const small = index + SMALL_A;
    
    if (big > BIG_Z)
        return [false, ''];
    
    const nameBig = String.fromCharCode(big);
    const nameSmall = String.fromCharCode(small);
    const dashedSmall = `_${nameSmall}`;
    const dashedBig = `_${nameBig}`;
    
    const names = [
        nameSmall,
        '_',
        nameBig,
        dashedSmall,
        dashedBig,
    ];
    
    for (const name of names) {
        if (!all[name])
            return [true, name];
    }
    
    return [false, ''];
}
