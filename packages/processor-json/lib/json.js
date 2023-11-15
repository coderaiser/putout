import {
    toJS,
    fromJS,
} from '@putout/operator-json';
import {isJSON} from './is-json.cjs';

export const files = ['*.json'];

export const branch = (rawSource) => {
    const source = toJS(rawSource);
    
    return [{
        source,
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list.filter(isJSON);
    return fromJS(source);
};
