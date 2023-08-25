import {transformAsync} from 'putout';
import {runAsWorker} from 'synckit';
import parseOptions from 'putout/parse-options';

runAsWorker(async ({name, options, ast, text}) => {
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    await transformAsync(ast, text, resultOptions);
    
    return ast;
});
