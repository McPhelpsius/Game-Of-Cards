let Card = require("../Card");

class Club extends Card {
    constructor ( value, name ) {
        super ( value, name );
        this.suit = 'Clubs';
        this.smallSVG = `<svg width="16" height="16" >
            <circle cx="12" cy="9" r="4" style="fill:black" />
            <circle cx="4" cy="9" r="4" style="fill:black" />
            <circle cx="8" cy="4" r="4" style="fill:black" />
            <polygon points="8,10 12,16 4,16" style="fill:black" />
    </svg>`;
        this.suitSVG = `<svg width="25" height="25" >
          <circle cx="18" cy="13" r="6" style="fill:black" />
          <circle cx="6" cy="13" r="6" style="fill:black" />
          <circle cx="12" cy="6" r="6" style="fill:black" />
          <polygon points="18,24 12,10 6,24" style="fill:black" />
        </svg>`;
    }    
}

module.exports = Club;