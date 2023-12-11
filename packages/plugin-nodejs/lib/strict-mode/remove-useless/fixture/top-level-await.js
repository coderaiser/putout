'use strict';

await import('supertape/bin/supertape');
await import('supertape/bin/supertape', {
    with: {
        type: 'json'
    }
});

await x('supertape/bin/supertape');
