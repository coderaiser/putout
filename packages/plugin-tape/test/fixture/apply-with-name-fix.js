import {stub} from 'supertape';
const init = stub().withName('init');
const show = stub().withName('show');

t.calledInOrder([init, show]);
