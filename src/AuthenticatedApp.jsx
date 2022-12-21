import { Routes, Route } from "react-router-dom";

import Users from "./components/users/users";
import Apps from "./components/apps/apps";
import AppUser from "./components/app_users/app_users";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app-user" element={<AppUser />} />
    </Routes>
  );
}

export default AuthenticatedApp;
