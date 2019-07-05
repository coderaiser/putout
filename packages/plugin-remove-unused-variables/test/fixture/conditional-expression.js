const a = 1;
const b = 2;
const c = 1 > 0 ? a : b;

const tmpl_a = 'hi';
const tmpl_b = 'bye';
const tmpl_c = 'hi';
const tmpl_d = 'bye';
const tmpl1 = 1 > 0 ? tmpl_a : `${tmpl_a}${tmpl_b}`;
const tmpl2 = 1 > 0 ? `${tmpl_c}${tmpl_d}`: tmpl_d;

const fn = 2 > 3 ? function sub() {} : function add() {};
