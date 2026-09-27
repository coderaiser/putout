import {types} from 'putout';

const {isCallExpression} = types;

if (isCallExpression(a.node)) {}

if (isCallExpression(a.node)) {}

if (isCallExpression(a)) {}

if (!isCallExpression(a.node)) {}

if (!isCallExpression(a)) {}

if (a.type === b) {}
