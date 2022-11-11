/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  
  const deck = [];
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const nonNumericCards = {
    11 : "Jack",
    12 : "Queen",
    13 : "King",
    1 : "Ace"
  }

  for (let index = 0; index < suits.length; index++) {
    
    for (let j = 1; j <= 13; j++) {
      let cardName = j
      let cardValue = j
      switch (j) {
        case 1 :
          cardName = nonNumericCards[j];
          cardValue = j + 10; //1 represents Ace, but value is 11
          break;
        case 11:
        case 12:
        case 13:
        cardName = nonNumericCards[j];
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

}



// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);