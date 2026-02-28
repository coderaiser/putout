function get() {
    if (a) {
        try {
            return a();
        } catch {
            return b();
        }

        
        return;
    } else {
        fn();
    }
}
