import putout from './putout.js';

export * from './putout.js';

const {assign} = Object;

function esmPutout(...a) {
    return putout(...a);
}

assign(esmPutout, putout);

export default esmPutout;
