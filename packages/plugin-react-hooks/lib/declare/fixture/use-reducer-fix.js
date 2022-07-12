import {useReducer} from 'react';
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
}
