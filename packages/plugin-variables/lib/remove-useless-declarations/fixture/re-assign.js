let newVal, oldAddr = oldState.config.address[id];

if (oldAddr != null) {
    newVal = getter(state);
}

state.values[idx] = newVal;
