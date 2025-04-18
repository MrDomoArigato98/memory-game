import { useState } from "react";
import "./reset.css";
import "./App.css";
import Fetch from "./components/Fetch";
function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestSCore] = useState(0);

  return (
    <>
      <Fetch />
    </>
  );
}

export default App;
