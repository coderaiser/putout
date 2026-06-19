import {
    toJS,
    fromJS,
    isJSON,
    isTOML,
    isDocker,
    isJSONGroup,
} from '../lib/json.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
toJS(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'string'
fromJS(5);

// THROWS Expected 1 arguments, but got 0
isJSON();

// THROWS Expected 1 arguments, but got 0
isTOML();

// THROWS Expected 1 arguments, but got 0
isDocker();

// THROWS Expected 1 arguments, but got 0
isJSONGroup();
