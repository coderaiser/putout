import {matchFiles} from '../lib/match-files.js';

// THROWS Expected 1 arguments, but got 0
matchFiles();

// THROWS Argument of type 'number' is not assignable to parameter of type 'MatchFilesOptions'
matchFiles(5);

// THROWS Argument of type 'string' is not assignable to parameter of type 'MatchFilesOptions'
matchFiles('');
