import tryToCatch from 'try-to-catch';
import enquirer from 'enquirer';
import actions from 'enquirer/lib/combos.js';
import {vim} from './vim.js';

const {Select: CustomSelect} = enquirer;

actions.keys = {
    ...actions.keys,
    ...vim,
};

export const choose = async (message, choices, {autofocus, Select = CustomSelect} = {}) => {
    const prompt = new Select({
        message,
        choices,
        autofocus,
    });
    
    const [, answer] = await tryToCatch(prompt.run.bind(prompt));
    
    return answer;
};
