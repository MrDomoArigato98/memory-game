import { useState, useEffect } from "react";

function getRandomNine(cards) {
  const shuffledCards = cards.sort(() => 0.5 - Math.random());
  let chosenCards = [];
  for (let index = 0; index < 12; index++) {
    chosenCards.push({
      id: shuffledCards[index].id,
      name: shuffledCards[index].id,
      url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${shuffledCards[index].id}_0.jpg`,
      clicked: false,
    });
  }
  console.log(chosenCards);
  return chosenCards;
}

function shuffleArray(array) {
  const shuffled = [...array]; // copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Fetch() {
  /*
    cards
    [
        {   
        id: name of champion,
        name: name of champion,
        image: image of champion,
        clicked: boolean
        },
     ]
*/
  //Use this to store the 9 cards list

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

  function shuffleOnClick(champions) {
    return champions.sort(() => 0.5 - Math.random());
  }

  function setClicked(e, id) {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, clicked: true } : card
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
