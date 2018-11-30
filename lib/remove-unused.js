'use strict';

const remove = ({path}) => path.remove();

module.exports = (items) => {
    items.forEach(remove);
};

