import {__filesystem_name} from '@putout/operator-json';

export const isFilesystem = (source) => !source.indexOf(__filesystem_name);
