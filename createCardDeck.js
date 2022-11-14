/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
 const getDeck = () => {
  
  const deck = [];
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  //face card object
  const faceCards = {
    11 : "Jack",
    12 : "Queen",
    13 : "King",
    1 : "Ace"
  }
//iterate through suits
  for (let index = 0; index < suits.length; index++) {
  //then iterate through each set of 13 cards for a given suit  
    for (let j = 1; j <= 13; j++) {
      //for most cards (2-10), card value is card name
      let cardName = j
      let cardValue = j
      //but for everything else, it's a face card
      switch (j) {
        case 1 :
          //retrieve face card name
          cardName = faceCards[j];
          cardValue = j + 10; //1 represents Ace, but value is 11
          break;
        case 11:
        case 12:
        case 13:
        cardName = faceCards[j];
        //Jack, Queen, King are worth 10
        cardValue = 10;
      }
      const card = {
        suit: suits[index],
        displayVal : cardName,
        val : cardValue
      }
      deck.push(card);
    }
    
  }
  return deck;

};