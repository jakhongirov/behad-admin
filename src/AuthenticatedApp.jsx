import { Routes, Route } from "react-router-dom";

import Users from "./components/users/users";
import Apps from "./components/apps/apps";
import AppUser from "./components/app_users/app_users";
import Survays from "./components/survays/survays";
import Posts from "./components/posts/posts";
import Answers from "./components/answers/answers";
import Category from "./components/category/category";
import News from "./components/news/news";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app-user" element={<AppUser />} />
      <Route path="/survays" element={<Survays />} />
      <Route path="/answers" element={<Answers />} />
      <Route path="/news" element={<News />} />
      <Route path="/category" element={<Category />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default AuthenticatedApp;
