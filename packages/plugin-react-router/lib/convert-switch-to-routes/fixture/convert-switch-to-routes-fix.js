const {Route, Routes} = require('react-router');

const routes = () => <Routes>
    <Route exact path="/login" component={ Login }/>
    <Route exact path="/join" component={ Join }/>
</Routes>;
