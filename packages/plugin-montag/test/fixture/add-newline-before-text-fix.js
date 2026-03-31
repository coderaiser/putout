import montag from 'montag';

montag`
   hello
`;

montag`
    world
`;

function inside() {
    montag`
       hello
   `;
}
