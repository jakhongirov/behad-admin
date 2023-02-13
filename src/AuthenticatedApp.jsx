import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Users from "./components/users/users";
import Apps from "./components/apps/apps";
import AppUser from "./components/app_users/app_users";
import Survays from "./components/survays/survays";
import AnswerUsers from "./components/answerUser/answerUser";
import Posts from "./components/posts/posts";
import Category from "./components/category/category";
import News from "./components/news/news";
import Tracking from "./components/tracking/tracking";
import TestCategory from "./components/testCategory/testCategory";
import Test from "./components/test/test";
import TestQuestion from "./components/testQuestion/testQuestion";
import UserCount from "./components/userCount/userCount";
import UserCity from "./components/userCity/userCity";
import UserByCity from "./components/usersByCity/usersByCity";
import AppUserFilter from "./components/appUserFilter/appUserFilter";
import AppUserByKey from "./components/appUserByKey/appUserByKey";
import TrackingFilter from "./components/trackingFilter/trackingFilter";
import Pill from "./components/pills/pills";

function AuthenticatedApp() {
  const [appKey, SetAppKey] = useState()

  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app-user" element={<AppUser />} />
      <Route path="/appUserCount" element={<AppUserFilter />} />
      <Route path="/appUserBy/:key" element={<AppUserByKey />} />
      <Route path="/userCount" element={<UserCount />} />
      <Route path="/userCountry-City/:country/:city" element={<UserByCity />} />
      <Route path="/userCity/:country" element={<UserCity />} />
      <Route path="/survays" element={<Survays />} />
      <Route path="/answerUsers/:surveyId/:answer" element={<AnswerUsers />} />
      <Route path="/news" element={<News />} />
      <Route path="/category/:app_key" element={<Category SetAppKey={SetAppKey} />} />
      <Route path="/post" element={<Posts appKey={appKey} />} />
      <Route path="/tracking/:userId/:key" element={<Tracking />} />
      <Route path="/trackingFilter" element={<TrackingFilter />} />
      <Route path="/testCategories" element={<TestCategory />} />
      <Route path="/test" element={<Test />} />
      <Route path="/testQuestion" element={<TestQuestion />} />
      <Route path="/pills" element={<Pill />} />
    </Routes>
  );
}

export default AuthenticatedApp;
