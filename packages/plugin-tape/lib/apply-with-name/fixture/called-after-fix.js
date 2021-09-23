const init = stub().withName('init');
const show = stub().withName('show');

t.calledAfter(init, show);
