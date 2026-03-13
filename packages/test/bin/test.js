#!/usr/bin/env node

import 'supertape/bin/supertape';

import {callWhenTestsEnds} from 'supertape';
import {whenTestsEnds} from '@putout/printer/type-checker/when-tests-ends';

callWhenTestsEnds('PUTOUT_INSTRUMENT', whenTestsEnds);
