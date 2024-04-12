import {operator} from 'putout';

const {getProperties} = operator;
const {
    overridesPath,
    parserPath,
    rulesPath,
} = getProperties(__jsonPath, ['parser', 'rules', 'overrides']);
