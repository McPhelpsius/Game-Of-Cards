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
        return `<div class="card">
            <h3>
                ${this.smallSVG}
                <span>${this.icon}</span>
            </h3>
                ${this.suitSVG}
            <h3>
                ${this.smallSVG}
                <span>${this.icon}</span>
            </h3>
        </div>`;
    }
}

module.exports = Card;