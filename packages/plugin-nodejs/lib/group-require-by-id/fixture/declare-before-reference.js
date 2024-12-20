const {extend} = require('supertape');
const {parse, transform} = require('putout');

const montag = require('montag');
const putout = require('putout');

const {print} = require('../../../../printer');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const {types} = require('@putout/babel');
const {replaceWithMultiple} = require('@putout/operate');
const fixture = readFixtures(__dirname);
const {CallExpression} = types;


