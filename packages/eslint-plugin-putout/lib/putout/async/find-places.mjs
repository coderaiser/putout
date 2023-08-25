import {findPlacesAsync} from 'putout';
import tryToCatch from 'try-to-catch';
import {runAsWorker} from 'synckit';
import parseOptions from 'putout/parse-options';

runAsWorker(async ({name, options, ast, text}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    return await tryToCatch(findPlacesAsync, ast, text, resultOptions);
});
