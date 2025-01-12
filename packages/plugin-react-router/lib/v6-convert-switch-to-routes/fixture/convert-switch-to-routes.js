const {Route, Switch} = require('react-router');

const routes = () => <Switch>
    <Route exact path="/login" component={ Login }/>
    <Route exact path="/join" component={ Join }/>
</Switch>;
