const {
  test,
  stub
} = require('supertape');

const init = stub().withName('init');
const show = stub().withName('show');

t.calledInOrder([init, show]);
