import {template} from 'putout';
module.exports.fix = (path) => {
    path.node = template.ast('hello');
}
