import {stub} from 'supertape';

const read = stub().returns(stringify({
    'checkCoverage': true,
}));
