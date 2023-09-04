import evolve from 'ramda/src/evolve';
import not from 'ramda/src/not';
import mergeDeepRight from 'ramda/src/mergeDeepRight';

export default evolve({
    isPanelVisible: not,
    items: mergeDeepRight,
});
