import { useState, useEffect } from "react";

function getRandomNine(champions) {
  const shuffledChampions = champions.sort(() => 0.5 - Math.random());
  let chosenCards = [];
  for (let index = 0; index < 9; index++) {
    chosenCards.push({
      id: shuffledChampions[index].id,
      name: shuffledChampions[index].id,
      url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${shuffledChampions[index].id}_0.jpg`,
    });
  }
  return chosenCards;
}

const Fetch = () => {
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
        //Just get the list of champions. data is an object within data.

        console.log(Object.values(data.data).sort(() => 0.5 - Math.random()));

        // Here I need a way to extract the images from 9 random champions
        setCards(getRandomNine(Object.values(data.data)));
      });
  }, []);

  return (
    <>
      <div>
        {/* This works but pretty damn slow */}
        {/* {cards.map((photo) => (
          <img key={photo.id} src={photo.url} alt={photo.title} width={100} />
        ))} */}
      </div>
    </>
  );
};

export default Fetch;
