import {extend} from 'supertape';
import {printExtension} from '#test/printer';
import {readFixtures} from '#test/fixture';

export const createTest = (dir) => {
    const fixture = readFixtures(dir);
    const test = extend({
        print: printExtension,
    });
    
    return {
        fixture,
        test,
    };
};

