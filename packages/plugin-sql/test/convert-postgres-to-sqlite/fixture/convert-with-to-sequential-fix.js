[
    insert(into(
        CallExpression,
        parent_id,
        values(':parent_id'),
    ), returning(as(id, 'call_id'))),
    insert(into(
        MemberExpression,
        parent_id,
        select(id, from(':call_id')),
    ), returning(as(id, 'member_id'))),
    insert(into(Identifier, [name, parent_id], select('x', id, from(':member_id')))),
];
