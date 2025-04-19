import { useState } from "react";
import "./reset.css";
import "./App.css";
import Fetch from "./components/Fetch";
import Header from "./components/Header";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestSCore] = useState(0);
  const [open, setOpen] = useState(false);

  function incrementScore() {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestSCore(score + 1);
    }
  }

  function resetScore() {
    setOpen(true);
    setScore(0);
  }

  function handleCloseDialog() {}

  return (
    <>
      <Header score={score} bestScore={bestScore} />

      <Fetch incrementScore={incrementScore} resetScore={resetScore} />
    </>
  );
}

export default App;
