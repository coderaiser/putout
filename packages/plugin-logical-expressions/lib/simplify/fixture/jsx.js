const jsx = (
    <div>{Boolean(info) && <Alert severity="info">{convertToString(info)}</Alert>}
    </div>
);

const jsx2 = (
    <button disabled={Boolean(error) || disabled}>
    </button>
);
