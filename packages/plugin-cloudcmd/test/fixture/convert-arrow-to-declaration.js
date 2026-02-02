
export const init = async (hello) => {
    await CloudCmd.EditNames();
}

export const show = () => {
    Events.addKey(listener);
    
    CloudCmd.EditNames
        .show(ConfigView)
        .getEditor()
        .setKeyMap('vim');
}

export const hide = () => {
    CloudCmd.Edit.hide();
}


export const hello = () => {};