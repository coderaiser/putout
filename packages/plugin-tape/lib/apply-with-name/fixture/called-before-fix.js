const init = stub().withName('init');
const show = stub().withName('show');

t.calledBefore(init, show);
