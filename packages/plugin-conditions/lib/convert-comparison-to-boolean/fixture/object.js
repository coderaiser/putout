const STEP_STATE = {
    ENABLED: true,
};

const useStep = (props) => {
    const { state, navEnabled } = { ...props };

    const isNavEnabled = navEnabled && state === STEP_STATE.ENABLED;

    return {
        isNavEnabled,
    };
};

export { useStep };
