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