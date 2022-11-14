/**
* Represents a card player (including dealer).
* @constructor
* @param {string} name - The name of the player
*/
class CardPlayer {
  constructor(name) {
    //set player name, an empty hand, and a full deck
      this.name = name;
      this.hand = [];
      this.blackjackDeck = getDeck();
      this.randomNum = [];
  }
  drawCard() {
      const randomCardNumber = Math.floor(Math.random() * 52);
      this.randomNum.push(randomCardNumber);
      this.hand.push(this.blackjackDeck[randomCardNumber]);
  }
}

/**
 * Calculates the total point value of a given hand (array of card objects)
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {number} pointValue from hand
  */
 const calculateTotalPointValue = (hand) => {
  let pointValue = 0;
  let aceCount = 0;

  //calculate number of aces in the deck
  aceCount = hand.filter((item) => item.displayVal === 'Ace').length;

  for (let card of hand) {
      pointValue += card.val;
  }
  //rotates the ace value to 1 from 11 if the total is over 21
  if (pointValue > 21 && aceCount > 0) {
      for (let eachCard of hand) {
          if (eachCard.displayVal === 'Ace' && eachCard.val === 11 && pointValue > 21) {
              eachCard.val = 1;
              pointValue = calculateTotalPointValue(hand);
          }
      }
  }
  return pointValue;
}

/**
* Calculates the score of a Blackjack hand
* @param {Array} hand - Array of card objects with val, displayVal, suit properties
* @returns {Object} blackJackScore
* @returns {number} blackJackScore.total
* @returns {boolean} blackJackScore.isSoft
*/
const calcPoints = (hand) => {

  let countOfAceWorthEleven = 0;

  const blackJackScore = {
      total: 0,
      isSoft: false
  }
 
  blackJackScore.total = calculateTotalPointValue(hand);

  //now that we've rotated the value, how many aces are worth just one point
  countOfAceWorthEleven = hand.filter((item) => item.val === 11 && item.displayVal === 'Ace').length;

  blackJackScore.isSoft = countOfAceWorthEleven > 0 ? true : false;

  return blackJackScore;
}

/**
* Determines whether the dealer should draw another card.
*
* @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
* @returns {boolean} whether dealer should draw another card
*/
const dealerShouldDraw = (dealerHand) => {
  // calculate points from BlackJackhand, return false or true for drawing a card
  const dealerBlackJackScore = calcPoints(dealerHand);
  let drawCard = false;

  if (dealerBlackJackScore.total <= 16) {
      drawCard = true;
  } else if (dealerBlackJackScore.total === 17 && dealerBlackJackScore.isSoft === true) {
      drawCard = true;
  }
  return drawCard;

}

/**
* Determines the winner if both player and dealer stand
* @param {number} playerScore
* @param {number} dealerScore
* @returns {string} Shows the player's score, the dealer's score, and who wins
*/
const determineWinner = (playerScore, dealerScore) => {
  let playerOver21 = false;
  let dealerOver21 = false;

  playerOver21 = playerScore > 21 ? true : false;
  dealerOver21 = dealerOver21 > 21 ? true : false;

  //if player score is less than 21 and greater than dealer score or if dealer went over 21 and player did not
  if ((playerScore > dealerScore && playerOver21 === false) || (dealerOver21 === true && playerOver21 === false)) {
      console.log(`Player Wins!  Player Score: ${playerScore} Dealer Score: ${dealerScore}`);
  }//if dealer score is less than 21 and greater than player score or if dealer went over 21 and player did not
  else if ((dealerScore > playerScore && dealerOver21 === false) || (playerOver21 === true && dealerOver21 === false)) {
      console.log(`Dealer Wins!  Player Score: ${playerScore} Dealer Score: ${dealerScore}`);
  } else {
      console.log(`Draw, try again!  Player Score: ${playerScore} Dealer Score: ${dealerScore}`);
  }

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
* Logs the player's hand to the console
* @param {CardPlayer} winner
*/
const blackJackWin = (winner) => {
  console.log(`${winner.name}'s got a BlackJack! Automatic win!`);
}


// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer");
const player = new CardPlayer("Player");




/**
 * Runs Blackjack Game
 */
 const startGame = function () {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  let dealerScore = calcPoints(dealer.hand).total;
  //Black jack on the first two cards
  if (playerScore === 21){
    blackJackWin(player);
    return showHand(player);
  }
  if (dealerScore === 21){
    blackJackWin(dealer);
    return showHand(dealer);
  }
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
console.log(startGame());