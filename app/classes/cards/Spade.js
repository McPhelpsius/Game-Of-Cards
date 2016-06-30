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