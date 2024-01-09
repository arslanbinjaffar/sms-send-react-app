import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/signup";
import SignInForm from "./pages/signIn";
import SignIn from "./pages/admin";
import MessageSender from "./pages/MessageSender";
import NotFoundPage from "./pages/PageNotFound";
import ProtectRoute from "./protectRoute/ProtectRoute";
import Loader from "./components/Loader";
import CountDown from "./components/countDown";
const App = () => {
  return (
    <>
      <Routes>      
      <Route path="/signup" element={<SignUpForm />} />
        {/* <Route path="/login" element={<SignInForm />} /> */}
        <Route path="/admin" element={<SignIn/>} />
        <Route path="/" element={
      <ProtectRoute>
          <MessageSender />
      </ProtectRoute>
        } />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
      
  );
};

export default App;
