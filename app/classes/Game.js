let Spade = require('./cards/Spade');
let Heart = require('./cards/Heart');
let Club = require('./cards/Club');
let Diamond = require('./cards/Diamond');
let Player = require('./Player');

class Game {
    constructor(){
        this.table = document.getElementById('table');
        this.whoseTurnIndex = 0;
        this.removed = [];
        this.discardPile = [];
        this.handCounter = 0;
        this.currentHandCards = [];
        this.currentTrickCards = [];
        this.spade = Spade;
        this.heart = Heart;
        this.diamond = Diamond;
        this.club = Club;
        this.deck = this.prepareDeck();
        this.start();
    }

    prepareDeck(){
        let cards = [];
        // cardNames is available
        this.gameSettings = this.configureDeck();
        let cardNames = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
        
        if (this.gameSettings.aceHigh == "high") {
            let ace = cardNames.shift();
            cardNames[cardNames.length] = ace;
        }
        let cardsUsed = this.gameSettings.cards; 
        let suitsUsed = this.gameSettings.suits;
        for (let c = 0; c < cardsUsed.length; c++) {
            let cardValue = cardNames.indexOf(cardsUsed[c]);
            if (suitsUsed.constructor === Array) {
                for ( let s = 0; s <  suitsUsed.length; s++ ) {
                    cards[cards.length] = new this[suitsUsed[s]](cardValue, cardsUsed[c]);
                }    
            } 
            else if (suitsUsed.constructor === String) {
                cards[cards.length] = new this[suitsUsed](cardValue, cardsUsed[c]);
                
            }
            else {
                alert("Why aren't you using any suits?");
            }
        }
        
        return cards;
    }

    configureDeck () {
        
        /// deckSettings = {ace: 'low', suits: ['Hearts', 'Spades', 'Diamonds', 'Clubs'], cards: [13], cardValues: []}
        let gameConfigs = {},
            configDataArray = location.search.slice(1).split("&");
        
        for (var d = 0; d < configDataArray.length; d++) {
            let dat = configDataArray[d].split("="),
                datNext = [],
                datKey = dat[0],
                datData = dat[1];

            if ( configDataArray[d+1] ) {
                datNext = configDataArray[d+1].split("=");
            }

            if (!gameConfigs[datKey]) {
                if ( datNext[0] === datKey ) { 
                    gameConfigs[datKey] = [datData];    
                } else {
                    gameConfigs[datKey] = datData;
                } 
                
            } else {
                gameConfigs[datKey].push(datData);
            }
        }

        return gameConfigs;

    }
    
    start () {
        this.enterPlayers();
        this.deal();
        this.beginAHand();
    }

    enterPlayers(){
        this.numberOfPlayers = this.gameSettings.numberOfPlayers;
        const players = [];
        for(let player = 0; player < this.numberOfPlayers; player++){
            let currentPlayer = players[players.length] = new Player(this.gameSettings.playerNames[player], this);
            currentPlayer.hand = this.table.innerHTML += currentPlayer.handTemplate;
        }
        this.players = players;
    }
  
    deal () {
        this.clearHands();
        this.shuffle();
        let playerPosition = 0;
        for(let card = 0; card < this.deck.length; card++){
            this.players[playerPosition].receiveCard(this.deck[card]);
            playerPosition++;
            if ( playerPosition === this.players.length ){
                playerPosition = 0;
            }
        }
        
        this.buildHands();
        for (let x = 0; x < this.players.length; x++) {
            this.players[x].readyCards();
        }
        return this.players[0];
    }

    clearHands(){
        
        for( let p = 0; p < this.players.length; p++ ){
            if(this.players[p].cards){
                this.players[p].cards = [];   
            }
            
            let handCardElement = document.getElementById(this.players[p].name).querySelector('.handCards');
            
        if (handCardElement.querySelectorAll('.cards')) {
                handCardElement.innerHTML = '';
            }
        }
    }

    shuffle () {
        this.deck.sort( function(){ return 0.5 - Math.random() } );
    }
    
    buildHands () {
        for(let h = 0; h < this.players.length; h++) {
            let thisGuy = this.players[h];
            let handCardElement = document.getElementById(thisGuy.name).querySelector('.handCards');
            for(let c = 0; c < thisGuy.cards.length; c++) {
                handCardElement.innerHTML += thisGuy.cards[c].template();
            }
        }
    }

    beginAHand () {
        this.playATrick();
    }

    finishHand () {
        // done?

        // prepare next hand
    }

    playATrick () {
        // let one player play a card at a time
        this.players[0].takeTurn();
    }
    whoWon () {
        // need winning player, the high value, winning card
        let highValue = 0,
            winningCard = {},
            winningPlayer = {};

        for (let x = 0; x < this.currentTrickCards.length; x++ ) {
            if (this.currentTrickCards[x].value > highValue) {
                highValue = this.currentTrickCards[x].value;
                winningCard = this.currentTrickCards[x];
                winningPlayer = this.players[x];
            }             
        }

        console.log(winningPlayer.name + ' won with a ' + winningCard.name + ' of ' + winningCard.suit);
        this.currentTrickCards = [];
        this.playATrick();
    }

    nextPlayer ( ) {
        if ( this.whoseTurnIndex == this.players.length-1 ) {
            this.whoseTurnIndex = 0;
            this.whoWon();
        } else {
            this.whoseTurnIndex++;
            this.players[this.whoseTurnIndex].takeTurn( );
        }
        
    }

  
}

// play hand


module.exports = Game;