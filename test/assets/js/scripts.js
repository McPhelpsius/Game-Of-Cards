(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

let Game = require('./classes/Game');

///Game



const startButton = document.getElementById('startButton');
startButton.addEventListener("click", function () {
    $('#startScreen').fadeOut(300, function() { $(this).remove();})
    const game = new Game();
});

/*

Leave cards out
Play a round

*/
},{"./classes/Game":4}],2:[function(require,module,exports){
(function ($) {

    if ( !!location.search ) {
        document.forms[0].style.display = "none";
    } else {
        document.querySelector('#cardTable').style.display = "none";
    }

    const playerNumberInput = document.querySelector( 'input[name="numberOfPlayers"]' ),
        playerInputsTarget = document.getElementById( 'playerNames' ),
        playerNameInputMarkup = `<input type="text" name="playerNames" required>`;

    playerNumberInput.addEventListener( "keyup", function ( ) {

        let thisManyPlayers = playerNumberInput.value;

        if( !!thisManyPlayers ) {

            let thisManyPlayersAdjusted = thisManyPlayers - 1,
                playerNamesInputs = playerInputsTarget.querySelectorAll('input[type="text"]');

            if ( playerNamesInputs.length < thisManyPlayersAdjusted ) {
                // calculate difference between length and value
                let difference = thisManyPlayersAdjusted - playerNamesInputs.length;            
                for(var p = 0; p <= difference; p++) {
                    playerInputsTarget.innerHTML += playerNameInputMarkup;
                }
            } else if ( playerNamesInputs.length > thisManyPlayersAdjusted ) {
                let difference = playerNamesInputs.length - thisManyPlayers;
                for(var p = 1; p <= difference; p++) {
                    playerInputsTarget.lastChild.remove();
                }
            }

        }

    });

    let inputs = document.querySelectorAll( 'input' ),
        pulseDots = document.querySelectorAll( '.pulse' ),
        innerPulseDots = document.querySelectorAll( '.innerPulse' ),
        pulseIndex = 0,
        nextPulse = pulseDots[0],
        pulseColors = ['#D3DA92', '#E962D7'],
        colorsIndex = 0,
        nextPulseColor = pulseColors[0],
        pulseZ = 800,
        lastPulse = pulseDots[pulseIndex - 1],
        lastInnerPulseDot = innerPulseDots[pulseIndex-1];

    for (let v = 0; v < inputs.length; v++) {
        $(inputs[v]).on("click", function(evt){            
            nextPulse = pulseDots[pulseIndex];
            nextPulseColor = pulseColors[colorsIndex];
            
            $(nextPulse).addClass( 'pulsing' ).css('background', nextPulseColor);
            $(lastPulse).removeClass( 'pulsing' ).delay( 500 );
            $(innerPulseDots[pulseIndex]).css({"left": evt.pageX + "px", "top": evt.pageY + "px", "z-index": pulseZ }).addClass( 'innerPulsing' ).animate({"left": evt.pageX-36 + "px", "top": evt.pageY-36 + "px"}, 560).delay( 300 );
            $(lastInnerPulseDot).removeClass( 'innerPulsing' );

            lastInnerPulseDot = innerPulseDots[pulseIndex];
            colorsIndex = colorsIndex < pulseColors.length-1 ? colorsIndex+1 : 0;
            pulseIndex = pulseIndex < pulseDots.length-1 ? pulseIndex+1 : 0;
            lastPulse = nextPulse;
            console.log(evt.pageX, evt.pageY);
        } );


    }

})(jQuery);

},{}],3:[function(require,module,exports){
class Card {
    constructor ( value, name ) {
        this.value = value;
        this.name = name;
        this.icon = this.createIcon(name);
        this.suit = '';
        this.smallSVG = '';
        this.suitSVG = '';
    }
    
    createIcon(name){
        return Number.isNaN(parseInt(name)) ? name.split('')[0] : name;
    }
    
    template ( ) {
        return `<div class="card flex-column">
            <h3 class="topLeftIcon cardIcon flex">
                <div class="cardNumber">${this.icon}</div>
                ${this.smallSVG}
            </h3>
            <h1>${this.icon}</h1>
            <h3 class="bottomRightIcon cardIcon flex">
                <div class="cardNumber">${this.icon}</div>
                ${this.smallSVG}
            </h3>
        </div>`;
    }

    trickEndAnimation (previousSiblingOffset) {
        return previousSiblingOffset + 28;
    }
}

module.exports = Card;
},{}],4:[function(require,module,exports){
let Spade = require('./cards/Spade');
let Heart = require('./cards/Heart');
let Club = require('./cards/Club');
let Diamond = require('./cards/Diamond');
let Player = require('./Player');

class Game {
    constructor(){
        this.table = document.getElementById('cardTable');
        this.whoseTurnIndex = 0;
        this.removed = [];
        this.discardPile = [];
        this.handCounter = 0;
        this.currentHandCards = [];
        this.currentTrickCards = [];
        this.trickIndex = 0;
        this.tablePlayedCards = this.table.querySelector('#thisHand');
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

    enterPlayers () {
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

    clearHands () {
        
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
        this.trickIndex = 0;
        this.playATrick();
    }

    finishHand () {
        // done?

        // prepare next hand
    }

    playATrick () {
        // let one player play a card at a time
        var trickContainer = document.createElement("div");
        trickContainer.className = "trickContainer flex";
        document.getElementById('thisHand').appendChild(trickContainer);
        this.players[0].takeTurn();
    }

    whoWon () {
        // need winning player, the high value, winning card
        let highValue = 0,
            winningCard = {},
            winningPlayer = {};

        let thisTrickDisplay = document.getElementById('thisHand').querySelectorAll('.trickContainer')[this.trickIndex];

        for (let x = 0; x < this.currentTrickCards.length; x++ ) {
            if (this.currentTrickCards[x].value > highValue) {
                highValue = this.currentTrickCards[x].value;
                winningCard = this.currentTrickCards[x];
                winningPlayer = this.players[x];
            }             
        }
        this.trickEndCardAnimations();
        let winnerTitle = document.createElement('div').innerText = winningPlayer.name;
        thisTrickDisplay.innerHTML += winnerTitle;
        this.currentTrickCards = [];
        this.trickIndex++;
        this.playATrick();
    }

    trickEndCardAnimations () {

        /// TODO: this isn't configured to '.trickContainer'... fix it
        let trickContainers = document.getElementById("thisHand").querySelectorAll('.trickContainer');
        let latestTrickContainer = trickContainers[trickContainers.length-1];
        // let firstCardOffsetLeft = document.getElementById("thisHand").querySelector('.card').offsetLeft;
        let firstCardOffsetLeft = latestTrickContainer.querySelector('.card').offsetLeft;
        // let theseHTML = document.getElementById("thisHand").querySelectorAll('.card');
        // let theseHTML = latestTrickContainer.querySelectorAll('.card');
        let theseHTML = $('#thisHand').find('.trickContainer').last().find('.card');
        let these = this.currentTrickCards;
        ///screwy///
        for (let t = (theseHTML.length - this.players.length + 1); t < theseHTML.length; t++) {
            $(theseHTML[t]).animate({'margin-left': '-46px'}).delay(300).animate({'margin-left': '-60px'});
        }

    }

    nextPlayer ( ) {
        if ( this.whoseTurnIndex == this.players.length-1 ) {
            this.whoseTurnIndex = 0;
            this.whoWon();
        } else {
            this.whoseTurnIndex++;
            this.players[this.whoseTurnIndex].takeTurn();
        }     
    }
  
}


// the trick containers exist, place cards inside them


module.exports = Game;
},{"./Player":5,"./cards/Club":6,"./cards/Diamond":7,"./cards/Heart":8,"./cards/Spade":9}],5:[function(require,module,exports){
class Player {
    constructor (name, gameInstance) {
        this.name = name;
        this.cards = [];
        this.gameInstance = gameInstance;
        this.myTurn = false;
        this.handTemplate = `<section id="${this.name}" class="hand flex-column"><h1>${this.name}</h1>
                <div class="handCards flex"></div>
            </section>`;
    }
    
    receiveCard(card){
        this.cards[this.cards.length] = card;
    }
    readyCards () {
        let handCards = document.getElementById(this.name).querySelector('.handCards');
        let theCards = handCards.querySelectorAll('.card');
        let that = this;
        for ( let h = 0; h < theCards.length; h++ ) {

            //this is bad, this needs to happen after the cards are dealt
            theCards[h].addEventListener("click", function () {
                if (that.myTurn) {
                    let theseCards = handCards.querySelectorAll('.card');
                    let discarded = that.playCard(theCards[h], theseCards, handCards);
                        
                    that.gameInstance.discardPile.push(discarded);
                    that.gameInstance.currentTrickCards.push(discarded);
                    console.log(that.gameInstance.discardPile);
                    console.log(that.name + 'is done');

                    //that.myTurn will be set to false elsewhere in a future version that allows multiple cards to be played
                    that.myTurn = false;
                    that.gameInstance.nextPlayer();
                }
            }, false);
        }
    }
    
    playCard (card, cards, cardsHTML) {
        let thisHandCard = cardsHTML.removeChild(cards.item([].indexOf.call(cards, card)));
        this.gameInstance.tablePlayedCards.appendChild(thisHandCard);
        let currentTrickContainer = document.getElementById('thisHand').querySelectorAll('.trickContainer')[this.gameInstance.trickIndex]; 
        currentTrickContainer.appendChild(thisHandCard);
        return this.cards.splice([].indexOf.call(cards, card), 1)[0];
    }
    
    takeTurn ( ) {
        this.myTurn = true;
    }
    
}

module.exports = Player;
},{}],6:[function(require,module,exports){
let Card = require("../Card");

class Club extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Clubs';
        this.smallSVG = `<svg width="12" height="11" >
            <circle cx="9" cy="6" r="3" style="fill:black" />
            <circle cx="3" cy="6" r="3" style="fill:black" />
            <circle cx="6" cy="3" r="3" style="fill:black" />
            <polygon points="6,6 9,11 3,11" style="fill:black" />
    </svg>`;
        this.suitSVG = `<svg width="25" height="25" >
          <circle cx="18" cy="13" r="5" style="fill:black" />
          <circle cx="6" cy="13" r="5" style="fill:black" />
          <circle cx="12" cy="6" r="5" style="fill:black" />
          <polygon points="17,22 12,9 7,22" style="fill:black" />
        </svg>`;
    }    
}

module.exports = Club;
},{"../Card":3}],7:[function(require,module,exports){
let Card = require("../Card");

class Diamond extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Diamonds';
        this.smallSVG = `<svg width="10" height="12" >
                <polygon points="5,0 10,6 5,12 0,6" style="fill:red" />
            </svg>`;
        this.suitSVG = `<svg width="20" height="25" >
                <polygon points="10,0 20,12.5 10,25 0,12.5" style="fill:red" />
            </svg>`;
    }    
}

module.exports = Diamond;
},{"../Card":3}],8:[function(require,module,exports){
let Card = require("../Card");

class Heart extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Hearts';
        this.suitSVG = `<svg width="25" height="30" >
          <circle cx="14" cy="7" r="5" style="fill:red" />
          <circle cx="6" cy="7" r="5" style="fill:red" />
          <polygon points="10,4 18,10 10,18 2,10" style="fill:red" />
        </svg>`;
        this.smallSVG = `<svg width="12" height="12">
          <circle cx="8" cy="4" r="3" style="fill:red" />
          <circle cx="3" cy="4" r="3" style="fill:red" />
          <polygon points="6,4 11,5 6,11 0,5" style="fill:red" />
        </svg>`;
    }    
}

module.exports = Heart;
},{"../Card":3}],9:[function(require,module,exports){
let Card = require("../Card");

class Spade extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Spades';
        this.suitSVG = `<svg width="25" height="25" >
          <circle cx="17" cy="14" r="5" style="fill:black" />
          <circle cx="7" cy="14" r="5" style="fill:black" />
          <polygon points="22,12 12,0 2,12" style="fill:black" />
          <polygon points="18,24 12,10 6,24" style="fill:black" />
        </svg>`;
        this.smallSVG = `<svg width="10" height="11" >
          <circle cx="6 " cy="7" r="2" style="fill:black" />
          <circle cx="2" cy="7" r="2" style="fill:black" />
          <polygon points="8,6 4,0 0,6" style="fill:black" />
          <polygon points="6,11 4,7 2,11" style="fill:black" />
        </svg>`;
        
    }    
}

module.exports = Spade;
},{"../Card":3}]},{},[1,2]);
