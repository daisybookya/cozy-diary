import Home from "./containers/Home";
import MainLayout from "./containers/MainLayout";
import MainPage from "./containers/MainPage";
import AddPage from "./containers/AddPage";
import DailyPage from "./containers/DailyPage";
import Setting from "./containers/Setting";
import Sample from "./containers/Sample";
import ErrorPage from "./containers/ErrorPage";
let router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        children: [
          {
            path: "home",
            element: <MainPage />,
          },
          {
            path: "add",
            element: <AddPage />,
          },
          {
            path: "day",
            element: <DailyPage />,
          },
        ],
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/sample",
        element: <Sample />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export { router };
