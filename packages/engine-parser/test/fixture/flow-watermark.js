/* eslint max-len: 0 */

// @flow

export function isIteratorStart(current: number, next: number): boolean {
  return current === charCodes.atSign && next === charCodes.atSign;
}
