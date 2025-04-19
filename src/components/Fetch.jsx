import { useState, useEffect } from "react";
import { getRandomNine, shuffleArray } from "./utils";

function Fetch({ incrementScore, resetScore }) {
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
        console.log(Object.values(data.data).sort(() => 0.5 - Math.random()));
        // Here I need a way to extract the images from 9 random champions
        setCards(getRandomNine(Object.values(data.data)));
      });
  }, []);

  // 'e' is equal to the e.target.name (which is the character name)
  function setClicked(e) {
    setCards((prevCards) => {
      const clickedCard = prevCards.find((card) => card.id === e);
      if (clickedCard.clicked) {
        console.log("Game Over! You already clicked that.");
        resetScore()
        return prevCards;
      }

      incrementScore()
      const updatedCards = prevCards.map((card) =>
        card.id === e ? { ...card, clicked: true } : card
      );

      // Simple shuffle (for now)
      const shuffled = shuffleArray(updatedCards);

      console.log("Clicked on " + e);
      return shuffled;
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
    </>
  );
}

export default Fetch;
