import {test} from 'supertape';
import {updateConfig} from './update-config.js';

test('putout: cli-choose-formatter: update-config', (t) => {
    const config = {
        formatter: ['time', {
            color: 'red',
        }],
    };
    
    updateConfig({
        formatter: 'dump',
        chosenFormatter: 'progress-bar',
        config,
    });
    
    const expected = {
        formatter: ['progress-bar', {
            color: 'red',
        }],
    };
    
    t.deepEqual(config, expected);
    t.end();
});
