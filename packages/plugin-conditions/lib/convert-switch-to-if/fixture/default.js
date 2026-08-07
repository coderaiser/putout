switch(a) {
case '>':
    return '<=';

default:
    return `!${a}`.replace('=', '');
}
