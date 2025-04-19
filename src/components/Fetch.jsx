import { useState, useEffect } from "react";
import { getRandomNine, shuffleArray } from "./utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Fetch({ incrementScore, resetScore }) {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 
https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json
https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/Aatrox.png
*/

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        alert("Please reload the page");
        console.error("Fetch Error: ", err);
        setLoading(false);
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
      {loading ? (
        <div className="loading">Loading . . .</div>
      ) : (
        <div className="card-grid">
          {cards.map((champ) => (
            <div key={champ.id} className="">
              <LazyLoadImage
                className="card"
                key={champ.id}
                src={champ.url}
                alt={"Image of " + champ.id}
                value={champ.id}
                name={champ.name}
                effect="blur"
                onClick={(e) => setClicked(e.target.name)}
              />
            </div>
          ))}
        </div>
      )}
      <br />
      <button onClick={() => newCardsOnClick()}>New champions!</button>
    </>
  );
}

export default Fetch;
