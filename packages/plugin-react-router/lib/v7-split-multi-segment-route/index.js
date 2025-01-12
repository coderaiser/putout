'use strict';

module.exports.report = () => `Split multi-segment splat <Route`;

module.exports.match = () => ({
    '<Route path="__a" element={__b} />': ({__a}) => {
        const {value} = __a;
        
        if (value === '*')
            return false;
        
        return __a.value.endsWith('*');
    },
});

module.exports.replace = () => ({
    '<Route path="__a" element={__b} />': ({__a}) => {
        const [name, mask] = __a.value.split(`/`);
        
        return `
              <Route path="${name}">
                <Route path="${mask}" element={__b} />
              </Route>
        `;
    },
});
