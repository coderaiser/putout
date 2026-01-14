import {__json_name} from '@putout/operator-json';

export const isJSON = (source) => !source.indexOf(__json_name);
