import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/createPage";
import { Toaster } from "react-hot-toast";

const App = () => {
   return (
      <div>
         <Navbar />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
         </Routes>
         <Toaster/>
      </div>
   );
};

export default App;
