import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Opensea from "./components/Opensea";
function App() {
  return (
    <>
      <div className="bg-black min-h-screen flex justify-center items-center w-screen">
        <Opensea />
      </div>
    </>
  );
}

export default App;
