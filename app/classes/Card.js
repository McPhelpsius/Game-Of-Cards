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