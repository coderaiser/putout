__putout_processor_sql([
    insert(into(users, name, values('Alice')), returning(id)),
]);
