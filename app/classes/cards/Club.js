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