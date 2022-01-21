import {types} from 'putout';

const {
  isStringLiteral
} = types;

const {
  isObjectExpression
} = types;

const {
  isIdentifier
} = types;

const {
  isCallExpression
} = types;

const {
  isArrayExpression
} = types;

isArrayExpression(node);
isCallExpression(node);
isIdentifier(node);
isObjectExpression(node);
isStringLiteral(node);
