'use strict';

Emitify.prototype.on = function(event, callback) {
    callback.apply(null, arguments);
};

