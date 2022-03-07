import tryCatch from 'try-catch';
import tryToCatch from 'try-to-catch';
const [error1] = tryCatch(fn, a);
const [error2] = await tryToCatch(fn, a);
