import * as removeDebugger from '@putout/plugin-remove-debugger';
import type {PutoutPlugin} from '../lib/plugin.d.ts';

const {report}: PutoutPlugin = removeDebugger;

report();
