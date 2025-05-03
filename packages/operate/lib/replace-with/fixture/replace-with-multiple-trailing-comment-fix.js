import {setTimeout} from 'node:timers/promises';
import blinkenlib from '../dist/blinkenlib_node.js';
/**
 * Machine Cross-language struct.
 * offsers access to some of the blink Machine struct elements,
 * such as registers and virtual memory.
 *
 * Javascript DataView  <-----> Struct of uint32_t pointers to
 *                              important elements of Machine m
 *
 *
 */

