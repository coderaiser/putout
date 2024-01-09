import putout from './putout.js';
import all from './putout.js';

export * from './putout.js';

const {assign} = Object;

function esmPutout(...a) {
    return putout(...a);
}

assign(esmPutout, all);

export default esmPutout;
