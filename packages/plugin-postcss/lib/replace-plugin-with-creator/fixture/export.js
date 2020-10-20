var postcss = require('postcss');
var extend = require('util')._extend;

var defaultOptions = {
    addAttribute: true,
    addClass: false
};

module.exports = postcss.plugin('postcss-disabled', function (opts) {

    opts = extend(extend({}, defaultOptions), opts);

    return function (root) {

        root.walkRules(function (rule) {

            if (rule.selector.indexOf(':disabled') !== -1) {

                var disabledSelectors = [];

                rule.selectors.forEach(function (selector) {

                    if (selector.indexOf(':disabled') !== -1) {

                        if (opts.addClass) {
                            disabledSelectors.push(
                                selector.replace(/:disabled/g, '.disabled')
                            );
                        }

                        if (opts.addAttribute) {
                            disabledSelectors.push(
                                selector.replace(/:disabled/g, '[disabled]')
                            );
                        }
                    }
                });

                if (disabledSelectors.length) {
                    rule.selectors = rule.selectors.concat(disabledSelectors);
                }
            }
        });

    };
});

