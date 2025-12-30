import {dirname} from 'node:path';
import {createRequire} from 'node:module';
import escalade from 'escalade/sync';
import {mergeOptions} from './merge-options.js';
import {parseMatch} from './parse-match.js';

const require = createRequire(import.meta.url);

export default (name, configName, overrides = {}) => {
    if (name === '<input>')
        return ['', {}];
    
    const customRequire = overrides.require || require;
    const dir = dirname(name);
    
    const [mainDir, optionsList] = getOptionsList({
        dir,
        configName,
        customRequire,
    });
    
    let mergedOptions = mergeOptions(...optionsList);
    
    for (const currentOptions of optionsList)
        mergedOptions = mergeOptions(
            mergedOptions,
            currentOptions,
            parseMatch(
                name,
                currentOptions.match,
            ),
        );
    
    return [mainDir, mergedOptions];
};

function getOptionsList({dir, configName, customRequire}) {
    let mainDir;
    const optionsList = [];
    
    escalade(dir, (dir, names) => {
        if (!names.includes(configName))
            return;
        
        mainDir = mainDir || dir;
        optionsList.push(customRequire(`${dir}/${configName}`));
    });
    
    return [mainDir, optionsList.reverse()];
}
