import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication, { Login, SignUp } from "./pages/Authentication";
import Error from "./pages/Error";
import DashboardLayout from "./layout/Dashboard";
import Clients from "./pages/Clients";
import ClientForm from "./components/ClientForm";
import PetRecords from "./pages/PetRecords";
import Pets from "./pages/Pets";
import PetRecordsForm from "./components/PetRecordsForm";
import Inventory from "./pages/Inventory";
import InventoryForm from "./components/InventoryForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="signin" element={<Authentication child={<Login />} />} />
      <Route path="signup" element={<Authentication child={<SignUp />} />} />
      <Route path="dashboard" element={<DashboardLayout child="" />} />
      <Route path="inventory" element={<DashboardLayout child="" />} />
      <Route path="clients/">
        <Route
          path=""
          element={<DashboardLayout child={<Clients />} />}
        ></Route>
        <Route
          path="create"
          element={<DashboardLayout child={<ClientForm />} />}
        ></Route>
      </Route>
      <Route path="pets/">
        <Route path="" element={<DashboardLayout child={<Pets />} />}></Route>
      </Route>
      <Route path="records/">
        <Route
          path=""
          element={<DashboardLayout child={<PetRecords />} />}
        ></Route>
        <Route
          path="create"
          element={<DashboardLayout child={<PetRecordsForm />} />}
        ></Route>
      </Route>
      <Route path="inventory/">
        <Route
          path=""
          element={<DashboardLayout child={<Inventory />} />}
        ></Route>
        <Route
          path="create"
          element={<DashboardLayout child={<InventoryForm />} />}
        ></Route>
      </Route>

      <Route path="*" element={<Error />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
