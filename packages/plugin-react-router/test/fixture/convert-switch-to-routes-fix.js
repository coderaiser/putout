const {Route, Routes} = require('react-router');

const routes = () => <Routes>
    <Route exact path="/login" element={ <Login /> }/>
    <Route exact path="/join" element={ <Join /> }/>
</Routes>;
