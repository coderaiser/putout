createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "dashboard/*",
    element: <Dashboard />,
  },
]);

createBrowserRouter([
  { path: "/", element: <Home /> },
  {
   path: "dashboard",
    children: [{ path: "*", element: <Dashboard /> }],
  },
]);
