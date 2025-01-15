var postcss = require('postcss');
var extend = require('util')._extend;

var defaultOptions = {
    addAttribute: true,
    addClass: false,
};

module.exports = function(opts) {
    opts = extend(extend({},
        defaultOptions,
    ), opts);
    
    return {
        postcssPlugin: 'postcss-disabled',
        Once(root) {
            root.walkRules(function(rule) {
                if (rule.selector.indexOf(':disabled') !== -1) {
                    var disabledSelectors = [];
                    
                    rule.selectors.forEach(function(selector) {
                        if (selector.indexOf(':disabled') !== -1) {
                            if (opts.addClass) {
                                disabledSelectors.push(selector.replace(/:disabled/g, '.disabled'));
                            }
                            
                            if (opts.addAttribute) {
                                disabledSelectors.push(selector.replace(/:disabled/g, '[disabled]'));
                            }
                        }
                    });
                    
                    if (disabledSelectors.length) {
                        rule.selectors = rule.selectors.concat(disabledSelectors);
                    }
                }
            });
        },
    };
};
module.exports.postcss = true;
