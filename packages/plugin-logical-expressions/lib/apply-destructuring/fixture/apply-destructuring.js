const arrow = (el) => el().text && el().text.trim();

const value = getState().workbench && getState().workbench.code;
