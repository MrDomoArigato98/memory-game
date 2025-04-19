import { useState } from "react";
import "./reset.css";
import "./App.css";
import Fetch from "./components/Fetch";
import Header from "./components/Header";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestSCore] = useState(0);

  function incrementScore() {
    setScore(score + 1);
    if (score > bestScore) {
      setBestSCore(score);
    }
  }

  return (
    <>
      <Fetch score={score} incrementScore={incrementScore} />
    </>
  );
}

export default App;
