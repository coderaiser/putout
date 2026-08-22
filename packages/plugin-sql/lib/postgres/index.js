import * as applyGenerateSeries from './apply-generate-series/index.js';
import * as convertSerialToIdentity from './convert-serial-to-identity/index.js';
import * as convertSequenceToSerial from './convert-sequence-to-serial/index.js';

export const rules = {
    'apply-generate-series': applyGenerateSeries,
    'convert-sequence-to-serial': convertSequenceToSerial,
    'convert-serial-to-identity': convertSerialToIdentity,
};
