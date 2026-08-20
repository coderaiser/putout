[
    withNamed(
        call = insert(into(CallExpression, parent_id, values(':parent_id')), returning(id)),
        member = insert(into(MemberExpression, parent_id, select(id, from(call))), returning(id)),
        insert(into(Identifier, [name, parent_id], select('x', id, from(member)))),
    ),
];