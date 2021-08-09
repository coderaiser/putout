export const SUCCESS = 0;
export const READ_ERROR = 10;
export const PARSE_ERROR = 11;
export const NO_RULES = 12;
export const WRITE_ERROR = 13;

export default {
    [SUCCESS]: '',
    [READ_ERROR]: 'Cannot read ".putout.json"',
    [PARSE_ERROR]: 'Cannot parse ".putout.json"',
    [NO_RULES]: '"rules" is missing in ".putout.json"',
    [WRITE_ERROR]: 'Cannot write to ".putout.json"',
};
