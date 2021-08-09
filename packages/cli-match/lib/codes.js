export const SUCCESS = 0;
export const NO_PATTERN = 20;
export const READ_ERROR = 21;
export const PARSE_ERROR = 22;
export const NO_RULES = 23;
export const WRITE_ERROR = 24;

export default {
    [SUCCESS]: '',
    [NO_PATTERN]: 'No pattern provided',
    [READ_ERROR]: 'Cannot read ".putout.json"',
    [PARSE_ERROR]: 'Cannot parse ".putout.json"',
    [NO_RULES]: '"rules" is missing in ".putout.json"',
    [WRITE_ERROR]: 'Cannot write to ".putout.json"',
};
