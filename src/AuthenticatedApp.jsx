import { Routes, Route } from "react-router-dom";

import Users from "./components/users/users";
import Apps from "./components/apps/apps";
import AppUser from "./components/app_users/app_users";
import Survays from "./components/survays/survays";
import Posts from "./components/posts/posts";
import Answers from "./components/answers/answers";
import Category from "./components/category/category";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app-user" element={<AppUser />} />
      <Route path="/survays" element={<Survays />} />
      <Route path="/answers" element={<Answers />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
}

export default AuthenticatedApp;
