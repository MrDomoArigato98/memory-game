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

export {shuffleArray, getRandomNine}