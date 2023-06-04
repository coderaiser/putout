'use strict';

const BIG_A = 65;
const BIG_Z = 90;
const SMALL_A = 97;
const SMALL_Z = SMALL_A + (BIG_Z - BIG_A);

module.exports.computeName = ({index, all, uid}) => {
    let [is, name] = generate({
        index,
        all,
    });
    
    if (is)
        return name;
    
    name = uid;
    
    for (let i = SMALL_A; i <= SMALL_Z; i++) {
        for (let j = BIG_A; j <= BIG_Z; j++) {
            name = String.fromCharCode(i) + String.fromCharCode(j);
            
            if (!all[name])
                break;
        }
    }
    
    return name;
};

function generate({index, all}) {
    const big = index + BIG_A;
    const small = index + SMALL_A;
    
    if (big > BIG_Z)
        return loop(all, ['_']);
    
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
    
    return loop(all, names);
}

function loop(all, names) {
    for (const [index, name] of names.entries()) {
        if (!all[name])
            return [true, name];
        
        const nameSmall = String.fromCharCode(SMALL_A + index);
        
        if (!all[nameSmall])
            return [true, nameSmall];
        
        const nameBig = String.fromCharCode(BIG_A + index);
        
        if (!all[nameBig])
            return [true, nameBig];
    }
    
    return [false, ''];
}
