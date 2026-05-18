import { createBrowserRouter } from "react-router";
import Home from "./features/recipe/pages/Home";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Landing from "./features/recipe/pages/Landing";
import Dashboard from "./features/recipe/pages/Dashboard";
import GenerateRecipe from "./features/recipe/pages/GenerateRecipe";
import History from "./features/recipe/pages/History";
import Settings from "./features/recipe/pages/Settings";
import Protected from "./features/auth/components/Protected";
import ViewRecipe from "./features/recipe/components/ViewRecipe";
import EditRecipe from "./features/recipe/components/EditRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "generate", element: <GenerateRecipe /> },
      { path: "recipe/:id", element: <ViewRecipe /> },
      { path: "recipe/edit/:id", element:<EditRecipe/>},
      { path: "history", element: <History /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
