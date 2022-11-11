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

const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    hand = [];
  }
  drawCard() {
    const randomCardNumber = Math.floor(Math.random() * 53);
    hand.push(blackjackDeck[randomCardNumber])
  }
}; //TODO - added

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Player"); // TODO - added
const player= new CardPlayer("Dealer"); // TODO - added

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  const blackJackScore = {
    total: 0,
    isSoft: false
  }
  for (let card of hand) {
      totalPoints += card.val
  }

}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE

}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
// console.log(startGame());