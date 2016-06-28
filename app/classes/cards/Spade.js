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
        this.smallSVG = `<svg width="15" height="15" >
          <circle cx="8" cy="9" r="3" style="fill:black" />
          <circle cx="4" cy="9" r="3" style="fill:black" />
          <polygon points="11,8 6,0 1,8" style="fill:black" />
          <polygon points="10,15 6,10 2,15" style="fill:black" />
        </svg>`;
        
    }    
}

module.exports = Spade;