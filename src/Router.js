import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication, { Login, SignUp } from "./pages/Authentication";
import Error from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="signin" element={<Authentication child={<Login />} />} />
      <Route path="signup" element={<Authentication child={<SignUp />} />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
