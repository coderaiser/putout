import {types} from 'putout';

const {
  isArrayExpression
} = types;

const {
  isCallExpression
} = types;

const {
  isIdentifier
} = types;

const {
  isObjectExpression
} = types;

const {
  isStringLiteral
} = types;

isArrayExpression(node);
isCallExpression(node);
isIdentifier(node);
isObjectExpression(node);
isStringLiteral(node);
