export default (render, req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            if (!req.xhr)
                return render(req, res);
        }
    });
}
