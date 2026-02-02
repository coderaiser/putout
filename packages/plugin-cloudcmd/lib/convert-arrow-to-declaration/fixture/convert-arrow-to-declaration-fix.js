export async function init(hello) {
    await CloudCmd.EditNames();
}

export function show() {
    Events.addKey(listener);
    
    CloudCmd.EditNames
        .show(ConfigView)
        .getEditor()
        .setKeyMap('vim');
}

export function hide() {
    CloudCmd.Edit.hide();
}

export const hello = () => {};
