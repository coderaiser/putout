switch(keyCode) {
case KEY.G:
    if (alt) {
        DOM.goToDirectory();
        event.preventDefault();
    }
    
    break;

case KEY.L:
    if (ctrlMeta) {
        CloudCmd.logOut();
        event.preventDefault();
    }
    
    break;
}
