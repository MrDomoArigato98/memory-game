import { useState, useEffect } from "react";

function getRandomNine(champions) {
  const shuffledChampions = champions.sort(() => 0.5 - Math.random());
  let chosenCards = [];
  for (let index = 0; index < 12; index++) {
    chosenCards.push({
      id: shuffledChampions[index].id,
      name: shuffledChampions[index].id,
      url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${shuffledChampions[index].id}_0.jpg`,
      clicked: false,
    });
  }
  console.log(chosenCards);
  return chosenCards;
}

function Fetch() {
  /*
    cards
    [
        {   
        id: name of champion,
        name: name of champion,
        image: image of champion
        },
     ]

    */
  //Use this to store the 9 cards list

  const [cards, setCards] = useState([]);
  // https://ddragon.leagueoflegends.com/cdn/15.8.1/data/en_US/champion.json
  // https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/Aatrox.png
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

  function testOnClick(e, id) {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, clicked: true } : card
      );
      console.log(updatedCards); // ← Safe here
      return updatedCards;
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
              onClick={(e) => testOnClick(e.target, champ.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Fetch;
