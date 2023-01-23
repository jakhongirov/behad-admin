import { Routes, Route } from "react-router-dom";

import Users from "./components/users/users";
import Apps from "./components/apps/apps";
import AppUser from "./components/app_users/app_users";
import Survays from "./components/survays/survays";
import Posts from "./components/posts/posts";
import Answers from "./components/answers/answers";
import Category from "./components/category/category";
import News from "./components/news/news";
import Tracking from "./components/tracking/tracking";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app-user" element={<AppUser />} />
      <Route path="/survays" element={<Survays />} />
      <Route path="/answers" element={<Answers />} />
      <Route path="/news" element={<News />} />
      <Route path="/category/:app_key" element={<Category />} />
      <Route path="/post" element={<Posts />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  );
}

export default AuthenticatedApp;
