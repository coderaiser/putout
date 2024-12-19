'use strict';

const {
    isNext,
    isCoupleLines,
    isNewlineBetweenSiblings,
    exists,
    noTrailingComment,
} = require('../../is');

const {hasPrevNewline} = require('../../mark');
const {isExportDeclaration} = require('@putout/babel').types;
const {maybeSpaceAfterKeyword} = require('./maybe-space-after-keyword');

const {isConcatenation} = require('../../expressions/binary-expression/concatenate');
const {parseLeadingComments} = require('../../comment/comment');
const {maybeDeclare} = require('../../maybe/maybe-declare');

isExportDeclaration();
