import { useState, useEffect } from "react";
import { getRandomNine, shuffleArray } from "./utils";

function Fetch({ incrementScore, resetScore }) {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);

  /* 
https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json
https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/Aatrox.png
*/

  useEffect(() => {
    fetch(
      "https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Just get the list of champions. data is an object within data.
        setAllCards(Object.values(data.data));
        // Here I need a way to extract the images from 9 random champions
        setCards(getRandomNine(Object.values(data.data)));
      });
  }, []);
  // 'e' is equal to the e.target.name (which is the character name)
  function setClicked(e) {
    const clickedCard = cards.find((card) => card.id === e);
    if (clickedCard.clicked) {
      console.log("Game Over! You already clicked that.");
      resetScore();
      resetClicked();
      return;
    }

    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === e ? { ...card, clicked: true } : card
      );

      console.log("Clicked on " + e);
      return shuffleArray(updatedCards);
    });
    incrementScore();
  }

  function newCardsOnClick() {
    setCards(getRandomNine(allCards));
  }
  function resetClicked() {
    setCards((prevCards) => {
      return shuffleArray(
        prevCards.map((card) => ({ ...card, clicked: false }))
      );
    });
  }

  return (
    <>
      <div className="card-grid">
        {/* This works but pretty damn slow */}
        {cards.map((champ) => (
          <div key={champ.id} className="card">
            <img
              key={champ.id}
              src={champ.url}
              alt={"Image of " + champ.id}
              value={champ.id}
              name={champ.name}
              width={150}
              loading="lazy"
              onClick={(e) => setClicked(e.target.name)}
            />
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => newCardsOnClick()}>New champions!</button>
    </>
  );
}

export default Fetch;
