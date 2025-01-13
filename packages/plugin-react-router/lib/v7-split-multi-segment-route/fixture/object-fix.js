createBrowserRouter([{
    path: '/',
    element: <Home/>,
}, {
    path: 'dashboard',
    children: [{
        path: '*',
        element: <Dashboard/>,
    }],
}]);

createBrowserRouter([{
    path: '/',
    element: <Home/>,
}, {
    path: 'dashboard',
    children: [{
        path: '*',
        element: <Dashboard/>,
    }],
}]);
