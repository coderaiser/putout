import {callWhenTestsEnds} from 'supertape';
import {whenTestsEnds} from '../lib/type-check-coverage/index.js';

callWhenTestsEnds('PUTOUT_INSTRUMENT', whenTestsEnds);
