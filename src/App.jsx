import { useState } from "react";
import "./reset.css";
import "./App.css";
import Fetch from "./components/Fetch";
import Header from "./components/Header";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestSCore] = useState(0);
  const [cardNumber, setCardNumber] = useState(12);

  function incrementScore() {
    setScore(score + 1);
    if (score >= bestScore) {
      setBestSCore(score + 1);
    }
  }

  function resetScore() {
    setScore(0);
  }

  function handleCardClick(e) {
    setBestSCore(0);
    setScore(0);
    setCardNumber(e);
    
  }

  return (
    <>
      <button value="9" onClick={(e) => handleCardClick(e.target.value)}>
        9 cards
      </button>
      <button value="12" onClick={(e) => handleCardClick(e.target.value)}>
        12 cards
      </button>
      <button value="16" onClick={(e) => handleCardClick(e.target.value)}>
        16 cards
      </button>
      <Header score={score} bestScore={bestScore} />
      <Fetch
        incrementScore={incrementScore}
        resetScore={resetScore}
        cardNumber={cardNumber}
      />
    </>
  );
}

export default App;
