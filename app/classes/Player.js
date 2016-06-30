class Player {
    constructor (name, gameInstance) {
        this.name = name;
        this.cards = [];
        this.gameInstance = gameInstance;
        this.myTurn = false;
        this.handTemplate = `<section id="${this.name}" class="hand"><h1>${this.name}</h1>
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
        document.getElementById('thisHand').appendChild(thisHandCard);
        return this.cards.splice([].indexOf.call(cards, card), 1)[0];
    }
    
    takeTurn ( ) {
        this.myTurn = true;
    }
    
}

module.exports = Player;