import "./App.css";
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";

function App() {

  const [count, setCount] = useState(0);
 
  return (
    <div className="App">
      <h1>React Hooks</h1>

      <p>{count}</p>
      <button onClick={() => setCount(count + 1)} >Count</button>

      <Hero name="clmm"></Hero>
    </div>
  );
}

export default App;
