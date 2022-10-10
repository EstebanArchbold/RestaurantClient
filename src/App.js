import React from "react";
import { Routes, Route } from 'react-router';

// Firebase
import firebase, { FirebaseContext } from './firebase';

// Components
import Orders from "./components/pages/Orders";
import Menu from "./components/pages/Menu";
import NewDish from "./components/pages/NewDish";
import Sidebar from "./components/ui/Sidebar";

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
          <div className="md:flex min-h-screen">
      {/* Use Sidebar out to see it in all pages */}
      <Sidebar/>

      <div className="md:w-3/5 xl:w-4/5 p-6">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/new-dish" element={<NewDish />} />
        </Routes>
      </div>
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
